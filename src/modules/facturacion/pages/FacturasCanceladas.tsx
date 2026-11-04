import { Download } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { useFacturacionStore } from '../context/FacturacionContext';
import { formatoFecha, formatoMoneda } from '../utils/format';
import type { Factura } from '../types';
export default function FacturasCanceladas() {
  const facturas = useFacturacionStore((s) => s.facturas.filter((f) => f.estado === 'Cancelada'));
  const descargar = (f: Factura) => { const texto = `Acuse de cancelación de ${f.folio}\nFecha: ${f.cancelacion?.fecha}\nMotivo: ${f.cancelacion?.motivo}`; const url = URL.createObjectURL(new Blob([texto], { type: 'text/plain' })); const a = document.createElement('a'); a.href = url; a.download = `acuse-${f.folio}.txt`; a.click(); URL.revokeObjectURL(url); };
  const columnas = [ { clave: 'folio', titulo: 'Folio', render: (f: Factura) => <strong>{f.folio}</strong> }, { clave: 'cliente', titulo: 'Cliente', render: (f: Factura) => <><span className="fact-cell-main">{f.cliente}</span><span className="fact-cell-sub">{f.rfc}</span></> }, { clave: 'fecha', titulo: 'Fecha de factura', render: (f: Factura) => formatoFecha(f.fecha) }, { clave: 'motivo', titulo: 'Motivo', render: (f: Factura) => f.cancelacion?.motivo ?? 'No especificado' }, { clave: 'usuario', titulo: 'Cancelada por', render: (f: Factura) => f.cancelacion?.usuario ?? 'Sistema' }, { clave: 'estado', titulo: 'Estado', render: () => <Badge estado="Cancelada" /> }, { clave: 'acuse', titulo: 'Acuse', render: (f: Factura) => <Button onClick={() => descargar(f)} aria-label={`Descargar acuse ${f.folio}`} icono={<Download size={14} />}>Descargar</Button> } ];
  return <div className="fact-page"><div className="fact-page-heading"><div><h2>Historial de cancelaciones</h2><p>Consulta motivos, responsables y acuses de cancelación.</p></div><span className="fact-badge fact-badge--danger">{facturas.length} canceladas</span></div><Card><div style={{ padding: '16px 0 0' }}><Table columnas={columnas} filas={facturas} vacio="No hay facturas canceladas." /></div><div className="fact-card__body" style={{ paddingTop: 10, color: 'var(--fact-muted)', fontSize: 10 }}>Importe relacionado: {formatoMoneda(facturas.reduce((s, f) => s + f.total, 0))}</div></Card></div>;
}
