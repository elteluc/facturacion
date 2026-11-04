import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { Usuario } from '../types';
const titulos: Record<string, string> = { '/': 'Resumen', '/facturas/nueva': 'Nueva factura', '/facturas': 'Facturas', '/canceladas': 'Facturas canceladas', '/pagos': 'Pagos y complementos', '/cotizaciones': 'Cotizaciones', '/notas-credito': 'Notas de crédito', '/recurrentes': 'Facturas recurrentes', '/clientes': 'Clientes', '/productos': 'Productos y servicios', '/reportes': 'Reportes', '/configuracion': 'Configuración' };
export function Layout({ children, usuario, onSalir }: { children: ReactNode; usuario?: Usuario; onSalir?: () => void }) {
  const location = useLocation();
  const titulo = titulos[location.pathname] ?? (location.pathname.startsWith('/facturas/') ? 'Detalle de factura' : 'Facturación');
  return <div className="fact-shell"><Sidebar /><div className="fact-main"><Header titulo={titulo} usuario={usuario} onSalir={onSalir} /><main className="fact-content">{children}</main></div></div>;
}
