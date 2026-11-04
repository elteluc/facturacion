import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Trash2, UserRound, Boxes, CircleDollarSign } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { useFacturacionConfig, useFacturacionStore } from '../context/FacturacionContext';
import type { ConceptoFactura, Factura, MetodoPago } from '../types';
import { calcularTotales } from '../utils/calculos';
import { formatoFecha, formatoMoneda } from '../utils/format';

const nuevaLinea = (): ConceptoFactura => ({ id: `con-${Date.now()}-${Math.random()}`, claveSat: '', descripcion: '', unidad: 'E48 - Servicio', cantidad: 1, precioUnitario: 0, iva: 16 });
export default function NuevaFactura() {
  const navigate = useNavigate();
  const clientes = useFacturacionStore((s) => s.clientes);
  const productos = useFacturacionStore((s) => s.productos);
  const agregarFactura = useFacturacionStore((s) => s.agregarFactura);
  const datosFiscales = useFacturacionStore((s) => s.datosFiscales);
  const { api } = useFacturacionConfig();
  const [clienteId, setClienteId] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [conceptos, setConceptos] = useState<ConceptoFactura[]>([nuevaLinea()]);
  const [metodoPago, setMetodoPago] = useState<MetodoPago>('PPD');
  const [formaPago, setFormaPago] = useState<Factura['formaPago']>('Por definir');
  const [vencimiento, setVencimiento] = useState('2026-10-30');
  const [retencionIsr, setRetencionIsr] = useState(0);
  const [retencionIva, setRetencionIva] = useState(0);
  const [error, setError] = useState('');
  const [vistaPrevia, setVistaPrevia] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const cliente = clientes.find((item) => item.id === clienteId);
  const totales = useMemo(() => calcularTotales(conceptos, retencionIsr, retencionIva), [conceptos, retencionIsr, retencionIva]);
  const actualizarLinea = (id: string, cambios: Partial<ConceptoFactura>) => setConceptos((actuales) => actuales.map((item) => item.id === id ? { ...item, ...cambios } : item));
  const seleccionarProducto = (lineaId: string, nombre: string) => { const producto = productos.find((item) => item.nombre === nombre); if (producto) actualizarLinea(lineaId, { productoId: producto.id, claveSat: producto.claveSat, descripcion: producto.nombre, unidad: producto.unidad, precioUnitario: producto.precio, iva: producto.iva }); else actualizarLinea(lineaId, { descripcion: nombre }); };
  const emitir = async () => {
    if (!cliente) { setError('Selecciona un cliente antes de emitir.'); return; }
    if (!conceptos.length || conceptos.some((item) => !item.descripcion.trim() || item.cantidad <= 0)) { setError('Agrega al menos un concepto válido.'); return; }
    const datos: Omit<Factura, 'id' | 'folio'> = { clienteId: cliente.id, cliente: cliente.nombre, rfc: cliente.rfc, fecha: '2026-09-30', vencimiento, subtotal: totales.subtotal, iva: totales.iva, retenciones: totales.retenciones, total: totales.total, estado: metodoPago === 'PUE' ? 'Pagada' : 'Emitida', metodoPago, formaPago, conceptos };
    setGuardando(true); setError('');
    try { const facturaGuardada = await api?.guardarFactura?.(datos); agregarFactura(facturaGuardada ?? datos); navigate('/facturas'); }
    catch { setError('No se pudo conectar con el servicio. Revisa la configuración de API e inténtalo de nuevo.'); }
    finally { setGuardando(false); }
  };
  return <div className="fact-page"><div className="fact-page-heading"><div><h2>Crear factura</h2><p>Completa los datos fiscales y los conceptos del comprobante.</p></div><span className="fact-badge fact-badge--info">Borrador nuevo</span></div>
    <Card className="fact-form-section"><h3 className="fact-section-title"><span><UserRound size={14} /></span>Cliente</h3><div className="fact-form-grid"><label className="fact-field fact-field--wide">Buscar cliente<input list="fact-clientes" value={busqueda} onChange={(e) => { setBusqueda(e.target.value); setClienteId(''); }} placeholder="Nombre o RFC del cliente" autoComplete="off" /><datalist id="fact-clientes">{clientes.map((item) => <option key={item.id} value={item.nombre}>{item.rfc}</option>)}</datalist>{cliente && <small>{cliente.rfc} · {cliente.regimenFiscal} · {cliente.correo}</small>}</label><label className="fact-field">Método de pago<select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value as MetodoPago)}><option value="PUE">PUE · Pago en una sola exhibición</option><option value="PPD">PPD · Pago en parcialidades o diferido</option></select></label><label className="fact-field">Forma de pago<select value={formaPago} onChange={(e) => setFormaPago(e.target.value as Factura['formaPago'])}>{['Por definir', 'Transferencia', 'Efectivo', 'Tarjeta', 'Cheque'].map((x) => <option key={x}>{x}</option>)}</select></label></div></Card>
    <Card className="fact-form-section"><h3 className="fact-section-title"><span><Boxes size={14} /></span>Conceptos</h3><div className="fact-concept-editor">{conceptos.map((item) => <div className="fact-concept-row" key={item.id}><label className="fact-field">Descripción<input list="fact-productos" value={item.descripcion} onChange={(e) => seleccionarProducto(item.id, e.target.value)} placeholder="Servicio o producto" /><datalist id="fact-productos">{productos.map((p) => <option key={p.id} value={p.nombre}>{p.claveSat}</option>)}</datalist></label><label className="fact-field">Cantidad<input type="number" min="0.01" step="0.01" value={item.cantidad} onChange={(e) => actualizarLinea(item.id, { cantidad: Number(e.target.value) })} /></label><label className="fact-field">Precio unitario<input type="number" min="0" step="0.01" value={item.precioUnitario} onChange={(e) => actualizarLinea(item.id, { precioUnitario: Number(e.target.value) })} /></label><label className="fact-field fact-concept-tax">IVA<select value={item.iva} onChange={(e) => actualizarLinea(item.id, { iva: Number(e.target.value) })}><option value={16}>16%</option><option value={8}>8%</option><option value={0}>0%</option></select></label><button className="fact-icon-button" onClick={() => setConceptos((prev) => prev.length > 1 ? prev.filter((linea) => linea.id !== item.id) : prev)} aria-label="Eliminar concepto"><Trash2 size={16} /></button></div>)}<Button variante="texto" icono={<Plus size={15} />} onClick={() => setConceptos((actuales) => [...actuales, nuevaLinea()])}>Agregar concepto</Button></div></Card>
    <Card className="fact-form-section"><h3 className="fact-section-title"><span><CircleDollarSign size={14} /></span>Totales e impuestos</h3><div className="fact-form-grid"><label className="fact-field">Retención ISR (%)<input type="number" min="0" max="100" step="0.01" value={retencionIsr} onChange={(e) => setRetencionIsr(Number(e.target.value))} /></label><label className="fact-field">Retención IVA (%)<input type="number" min="0" max="100" step="0.01" value={retencionIva} onChange={(e) => setRetencionIva(Number(e.target.value))} /></label><label className="fact-field">Fecha de vencimiento<input type="date" value={vencimiento} onChange={(e) => setVencimiento(e.target.value)} /></label></div><div className="fact-totals" style={{ marginTop: 20 }}><div className="fact-total-line"><span>Subtotal</span><span>{formatoMoneda(totales.subtotal)}</span></div><div className="fact-total-line"><span>IVA trasladado</span><span>{formatoMoneda(totales.iva)}</span></div><div className="fact-total-line"><span>Retenciones</span><span>− {formatoMoneda(totales.retenciones)}</span></div><div className="fact-total-line fact-total-line--grand"><span>Total</span><span>{formatoMoneda(totales.total)}</span></div></div></Card>
    <Card className="fact-form-section"><h3 className="fact-section-title"><span><FileText size={14} /></span>Extras</h3><div className="fact-form-grid"><label className="fact-field">Uso de CFDI<input value={cliente?.usoCfdi ?? 'G03'} readOnly /></label><label className="fact-field">Serie y folio<input value={`${datosFiscales.serie}-2026-${String(datosFiscales.siguienteFolio).padStart(4, '0')}`} readOnly /></label><label className="fact-field fact-field--wide">Notas internas<textarea placeholder="Notas para el equipo (no aparecen en la factura)" /></label></div></Card>
    {error && <div role="alert" className="fact-badge fact-badge--danger">{error}</div>}<div className="fact-form-footer"><Button onClick={() => navigate('/facturas')}>Cancelar</Button><Button icono={<FileText size={14} />} onClick={() => setVistaPrevia(true)}>Vista previa</Button><Button variante="primario" onClick={emitir} disabled={guardando}>{guardando ? 'Guardando…' : 'Emitir factura'}</Button></div>
    <Modal abierto={vistaPrevia} titulo="Vista previa de factura" onCerrar={() => setVistaPrevia(false)}><div className="fact-page"><div><strong>{datosFiscales.razonSocial}</strong><span className="fact-cell-sub">RFC {datosFiscales.rfc} · {datosFiscales.regimenFiscal}</span></div><div><strong>Cliente</strong><span className="fact-cell-sub">{cliente?.nombre ?? 'Selecciona un cliente'} · {cliente?.rfc ?? 'RFC'}</span></div><div className="fact-total-line"><span>Fecha</span>{formatoFecha('2026-09-30')}</div><div className="fact-total-line"><span>Subtotal</span>{formatoMoneda(totales.subtotal)}</div><div className="fact-total-line"><span>IVA</span>{formatoMoneda(totales.iva)}</div><div className="fact-total-line fact-total-line--grand"><span>Total</span>{formatoMoneda(totales.total)}</div><Badge estado="Emitida">Vista previa</Badge></div></Modal>
  </div>;
}
