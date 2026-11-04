import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, BarChart3, Building2, ChevronDown, CircleDollarSign, ClipboardList, FileClock, FilePlus2, FileText, Gauge, Layers3, Package, Settings2, UsersRound, WalletCards } from 'lucide-react';
import { Button } from './Button';
const links = [
  { to: '/', label: 'Resumen', icon: Gauge },
  { to: '/facturas/nueva', label: 'Nueva factura', icon: FilePlus2 },
  { to: '/facturas', label: 'Facturas', icon: FileText },
  { to: '/canceladas', label: 'Canceladas', icon: FileClock },
  { to: '/pagos', label: 'Pagos y complementos', icon: WalletCards },
  { to: '/cotizaciones', label: 'Cotizaciones', icon: ClipboardList },
  { to: '/notas-credito', label: 'Notas de crédito', icon: Layers3 },
  { to: '/recurrentes', label: 'Recurrentes', icon: Activity },
  { to: '/clientes', label: 'Clientes', icon: UsersRound },
  { to: '/productos', label: 'Productos y servicios', icon: Package },
  { to: '/reportes', label: 'Reportes', icon: BarChart3 },
  { to: '/configuracion', label: 'Configuración', icon: Settings2 },
];
export function Sidebar() {
  const [abierto, setAbierto] = useState(false);
  return <><button className="fact-mobile-menu" onClick={() => setAbierto((actual) => !actual)} aria-expanded={abierto} aria-label="Abrir navegación"><ChevronDown size={18} /></button>{abierto && <button aria-label="Cerrar menú" className="fact-sidebar-scrim" onClick={() => setAbierto(false)} />}<aside className={`fact-sidebar ${abierto ? 'is-open' : ''}`}><div className="fact-brand"><span className="fact-brand__mark"><CircleDollarSign size={21} /></span><span>norte<span className="fact-brand__dot">.</span><small>FACTURACIÓN</small></span></div><div className="fact-company"><span className="fact-company__icon"><Building2 size={17} /></span><span>Estudio Norte Digital<small>RFC END190514KJ3</small></span><ChevronDown size={14} /></div><nav className="fact-nav" aria-label="Navegación de facturación">{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setAbierto(false)} className={({ isActive }) => `fact-nav__link ${isActive ? 'is-active' : ''}`}><Icon size={17} strokeWidth={1.8} /><span>{label}</span>{label === 'Facturas' && <span className="fact-nav__count">6</span>}</NavLink>)}</nav><div className="fact-sidebar__footer"><div className="fact-help"><strong>¿Necesitas ayuda?</strong><span>Estamos para apoyarte.</span><Button variante="neutro" onClick={() => window.alert('Escríbenos a soporte@nortedigital.mx')}>Contactar soporte</Button></div><small>© 2026 Norte Digital</small></div></aside></>;
}
