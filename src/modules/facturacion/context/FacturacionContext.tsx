import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useStore } from 'zustand';
import type { FacturacionApi, ModuloFacturacionProps } from '../types';
import { createFacturacionStore, type FacturacionState, type FacturacionStore } from '../store/facturacionStore';

function crearApiRest(apiBaseUrl: string): FacturacionApi {
  const baseUrl = apiBaseUrl.replace(/\/+$/, '');
  return {
    obtenerFacturas: async () => {
      const respuesta = await fetch(`${baseUrl}/facturas`);
      if (!respuesta.ok) throw new Error('No se pudieron cargar las facturas.');
      return respuesta.json() as Promise<Awaited<ReturnType<NonNullable<FacturacionApi['obtenerFacturas']>>>>;
    },
    guardarFactura: async (factura) => {
      const respuesta = await fetch(`${baseUrl}/facturas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(factura),
      });
      if (!respuesta.ok) throw new Error('No se pudo guardar la factura.');
      return respuesta.json() as Promise<Awaited<ReturnType<NonNullable<FacturacionApi['guardarFactura']>>>>;
    },
  };
}

interface FacturacionConfig {
  apiBaseUrl?: string;
  api?: FacturacionApi;
  tema: 'claro' | 'oscuro';
}

const StoreContext = createContext<FacturacionStore | null>(null);
const ConfigContext = createContext<FacturacionConfig | null>(null);

export function FacturacionProvider({ children, apiBaseUrl, api, tema = 'claro' }: Pick<ModuloFacturacionProps, 'apiBaseUrl' | 'api' | 'tema'> & { children: ReactNode }) {
  const [store] = useState(createFacturacionStore);
  const config = useMemo<FacturacionConfig>(() => ({ apiBaseUrl, api: api ?? (apiBaseUrl ? crearApiRest(apiBaseUrl) : undefined), tema }), [apiBaseUrl, api, tema]);
  useEffect(() => {
    if (!config.api?.obtenerFacturas) return;
    let vigente = true;
    config.api.obtenerFacturas().then((facturas) => {
      if (vigente) store.getState().cargarFacturas(facturas);
    }).catch(() => undefined);
    return () => { vigente = false; };
  }, [config.api, store]);
  return <ConfigContext.Provider value={config}><StoreContext.Provider value={store}>{children}</StoreContext.Provider></ConfigContext.Provider>;
}

export function useFacturacionStore<T>(selector: (state: FacturacionState) => T): T {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useFacturacionStore debe usarse dentro de FacturacionProvider');
  return useStore(store, selector);
}

export function useFacturacionConfig(): FacturacionConfig {
  const config = useContext(ConfigContext);
  if (!config) throw new Error('useFacturacionConfig debe usarse dentro de FacturacionProvider');
  return config;
}
