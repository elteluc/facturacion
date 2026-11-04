import { createStore } from 'zustand/vanilla';
import type { StateCreator } from 'zustand/vanilla';
import { clientesMock, cotizacionesMock, datosFiscalesMock, facturasMock, notasCreditoMock, pagosMock, productosMock, recurrentesMock } from '../data/mock';
import type { Cliente, Cotizacion, DatosFiscales, Factura, FacturaRecurrente, NotaCredito, Pago, Producto } from '../types';

export interface FacturacionState {
  facturas: Factura[];
  clientes: Cliente[];
  productos: Producto[];
  pagos: Pago[];
  cotizaciones: Cotizacion[];
  notasCredito: NotaCredito[];
  recurrentes: FacturaRecurrente[];
  datosFiscales: DatosFiscales;
  cargarFacturas: (facturas: Factura[]) => void;
  agregarFactura: (factura: Omit<Factura, 'id' | 'folio'> | Factura) => Factura;
  cancelarFactura: (id: string, motivo: string, usuario: string) => void;
  agregarPago: (pago: Omit<Pago, 'id'>) => void;
  alternarRecurrente: (id: string) => void;
  guardarCliente: (cliente: Cliente) => void;
  guardarProducto: (producto: Producto) => void;
  actualizarDatosFiscales: (datos: DatosFiscales) => void;
  convertirCotizacion: (id: string) => void;
}

export const createFacturacionStore = () => {
  const initializer: StateCreator<FacturacionState> = (set, get) => ({
    facturas: facturasMock,
    clientes: clientesMock,
    productos: productosMock,
    pagos: pagosMock,
    cotizaciones: cotizacionesMock,
    notasCredito: notasCreditoMock,
    recurrentes: recurrentesMock,
    datosFiscales: datosFiscalesMock,
    cargarFacturas: (facturas) => set({ facturas }),
    agregarFactura: (datos) => {
      const factura: Factura = 'id' in datos && 'folio' in datos ? datos : {
        ...datos,
        id: `fac-${Date.now()}`,
        folio: `${get().datosFiscales.serie}-${new Date().getFullYear()}-${String(get().datosFiscales.siguienteFolio).padStart(4, '0')}`,
      };
      set((state) => ({ facturas: [factura, ...state.facturas], datosFiscales: { ...state.datosFiscales, siguienteFolio: state.datosFiscales.siguienteFolio + 1 } }));
      return factura;
    },
    cancelarFactura: (id, motivo, usuario) => set((state) => ({ facturas: state.facturas.map((factura) => factura.id === id ? { ...factura, estado: 'Cancelada', cancelacion: { motivo, fecha: new Date().toISOString().slice(0, 10), usuario } } : factura) })),
    agregarPago: (pago) => set((state) => ({ pagos: [{ ...pago, id: `pag-${Date.now()}` }, ...state.pagos] })),
    alternarRecurrente: (id) => set((state) => ({ recurrentes: state.recurrentes.map((item) => item.id === id ? { ...item, activa: !item.activa } : item) })),
    guardarCliente: (cliente) => set((state) => ({ clientes: [cliente, ...state.clientes.filter((item) => item.id !== cliente.id)] })),
    guardarProducto: (producto) => set((state) => ({ productos: [producto, ...state.productos.filter((item) => item.id !== producto.id)] })),
    actualizarDatosFiscales: (datosFiscales) => set({ datosFiscales }),
    convertirCotizacion: (id) => set((state) => ({ cotizaciones: state.cotizaciones.map((cotizacion) => cotizacion.id === id ? { ...cotizacion, estado: 'Convertida' } : cotizacion) })),
  });
  return createStore<FacturacionState>()(initializer);
};

export type FacturacionStore = ReturnType<typeof createFacturacionStore>;
