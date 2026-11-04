import { Link } from 'react-router-dom';
import { Activity, ArrowDownRight, ArrowUpRight, CalendarDays, CircleDollarSign, FilePlus2, FileText, ReceiptText, Wallet } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { useFacturacionStore } from '../context/FacturacionContext';
import { ventasSemanaMock } from '../data/mock';
import { formatoFecha, formatoMoneda } from '../utils/format';
import type { Factura } from '../types';

export default function Dashboard() {
  const facturas = useFacturacionStore((s) => s.facturas);
  const hoy = '2026-09-30';
  const mes = facturas.filter((f) => f.fecha.startsWith('2026-09') && f.estado !== 'Cancelada');
  const porCobrar = facturas.filter((f) => ['Pendiente', 'Emitida'].includes(f.estado)).reduce((s, f) => s + f.total, 0);
  const hoyTotal = facturas.filter((f) => f.fecha === hoy && f.estado !== 'Cancelada').reduce((s, f) => s + f.total, 0);
  const pagadas = facturas.filter((f) => f.estado === 'Pagada').length;
  const pendientes = facturas.filter((f) => ['Pendiente', 'Emitida'].includes(f.estado)).length;
  const canceladas = facturas.filter((f) => f.estado === 'Cancelada').length;
  const columnas = [
    { clave: 'folio', titulo: 'Folio', render: (f: Factura) => <span className="fact-cell-main">{f.folio}</span> },
    { clave: 'cliente', titulo: 'Cliente', render: (f: Factura) => <><span className="fact-cell-main">{f.cliente}</span><span className="fact-cell-sub">{f.rfc}</span></> },
    { clave: 'fecha', titulo: 'Fecha', render: (f: Factura) => formatoFecha(f.fecha) },
    { clave: 'total', titulo: 'Total', render: (f: Factura) => <span className="fact-cell-main">{formatoMoneda(f.total)}</span> },
    { clave: 'estado', titulo: 'Estado', render: (f: Factura) => <Badge estado={f.estado} /> },
  ];
  const datosDona = [{ name: 'Pagadas', value: pagadas, color: '#34D399' }, { name: 'Pendientes', value: pendientes, color: '#4F8DF7' }, { name: 'Canceladas', value: canceladas, color: '#F87171' }];
  const kpis = [
    { titulo: 'Facturado hoy', valor: formatoMoneda(hoyTotal), nota: 'vs. día anterior', icono: ReceiptText, cambio: '+12.8%' },
    { titulo: 'Facturado en el mes', valor: formatoMoneda(mes.reduce((s, f) => s + f.total, 0)), nota: 'Septiembre 2026', icono: CircleDollarSign, cambio: '+8.2%' },
    { titulo: 'Por cobrar', valor: formatoMoneda(porCobrar), nota: `${pendientes} facturas pendientes`, icono: Wallet, cambio: 'Atención' },
    { titulo: 'Canceladas', valor: String(canceladas).padStart(2, '0'), nota: 'En el periodo actual', icono: FileText, cambio: 'Este mes' },
  ];
  return <div className="fact-page">
    <div className="fact-page-heading"><div><h2>Buenos días, Lucía</h2><p>Este es el resumen de tu operación al 30 de septiembre de 2026.</p></div><div className="fact-actions"><span className="fact-button"><CalendarDays size={15} /> Últimos 30 días</span><Link to="/facturas/nueva"><Button variante="primario" icono={<FilePlus2 size={15} />}>Nueva factura</Button></Link></div></div>
    <div className="fact-kpis">{kpis.map(({ titulo, valor, nota, icono: Icon, cambio }) => <Card key={titulo} className="fact-kpi"><div className="fact-kpi__top"><span>{titulo}</span><span className="fact-kpi__icon"><Icon size={16} /></span></div><strong>{valor}</strong><span className="fact-kpi__note">{titulo !== 'Canceladas' && <ArrowUpRight size={11} color="#10B981" />} {nota} <span style={{ color: '#10B981' }}>{cambio}</span></span></Card>)}</div>
    <div className="fact-dashboard-grid"><Card><div className="fact-card__head"><h3>Ventas de los últimos 7 días</h3><span className="fact-badge fact-badge--success"><ArrowUpRight size={11} /> 8.4%</span></div><div className="fact-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={ventasSemanaMock} margin={{ top: 10, right: 14, left: -14, bottom: 0 }}><defs><linearGradient id="fact-ventas" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4F8DF7" stopOpacity={0.2} /><stop offset="100%" stopColor="#4F8DF7" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#EDF0F4" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fill: '#8993A2', fontSize: 10 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#8993A2', fontSize: 9 }} tickFormatter={(n) => `$${n / 1000}k`} /><Tooltip formatter={(v) => formatoMoneda(Number(v))} /><Area type="monotone" dataKey="total" stroke="#4F8DF7" strokeWidth={2.5} fill="url(#fact-ventas)" /></AreaChart></ResponsiveContainer></div></Card><Card><div className="fact-card__head"><h3>Estado de facturas</h3><Activity size={16} color="#8993A2" /></div><div className="fact-donut-wrap"><div className="fact-donut"><div className="fact-donut__label"><strong>{facturas.length}</strong><span>Facturas</span></div></div><div className="fact-legend">{datosDona.map((item, i) => <div className="fact-legend__item" key={item.name}><span className={`fact-legend__dot fact-legend__dot--${['green', 'blue', 'red'][i]}`} />{item.name}<strong>{item.value}</strong></div>)}</div></div><div style={{ display: 'none' }}><PieChart><Pie data={datosDona} dataKey="value" /></PieChart></div></Card></div>
    <Card><div className="fact-card__head"><h3>Últimas facturas</h3><Link className="fact-button fact-button--texto" to="/facturas">Ver todas <ArrowDownRight size={13} /></Link></div><div style={{ paddingTop: 12 }}><Table columnas={columnas} filas={facturas.slice(0, 5)} /></div></Card>
  </div>;
}
