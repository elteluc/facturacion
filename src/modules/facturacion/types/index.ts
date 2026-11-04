export type EstadoFactura = 'Pagada' | 'Pendiente' | 'Emitida' | 'Cancelada';
export type MetodoPago = 'PUE' | 'PPD';
export type FormaPago = 'Efectivo' | 'Transferencia' | 'Tarjeta' | 'Cheque' | 'Por definir';
export type Frecuencia = 'Semanal' | 'Mensual' | 'Trimestral' | 'Anual';
export type EstadoCotizacion = 'Borrador' | 'Enviada' | 'Aceptada' | 'Rechazada' | 'Convertida';

export interface Usuario {
  id: string;
  nombre: string;
  correo?: string;
  rol?: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  rfc: string;
  regimenFiscal: string;
  direccion: string;
  correo: string;
  telefono?: string;
  usoCfdi?: string;
}

export interface Producto {
  id: string;
  claveSat: string;
  nombre: string;
  unidad: string;
  precio: number;
  iva: number;
  categoria: string;
}

export interface ConceptoFactura {
  id: string;
  productoId?: string;
  claveSat: string;
  descripcion: string;
  unidad: string;
  cantidad: number;
  precioUnitario: number;
  iva: number;
  descuento?: number;
}

export interface Factura {
  id: string;
  folio: string;
  clienteId: string;
  cliente: string;
  rfc: string;
  fecha: string;
  vencimiento: string;
  subtotal: number;
  iva: number;
  retenciones: number;
  total: number;
  estado: EstadoFactura;
  metodoPago: MetodoPago;
  formaPago: FormaPago;
  conceptos: ConceptoFactura[];
  cancelacion?: { motivo: string; fecha: string; usuario: string };
}

export interface Pago {
  id: string;
  facturaId: string;
  folioFactura: string;
  cliente: string;
  fecha: string;
  monto: number;
  formaPago: FormaPago;
  referencia: string;
}

export interface Cotizacion {
  id: string;
  folio: string;
  cliente: string;
  fecha: string;
  vigencia: string;
  total: number;
  estado: EstadoCotizacion;
}

export interface NotaCredito {
  id: string;
  folio: string;
  facturaOriginal: string;
  cliente: string;
  fecha: string;
  motivo: string;
  monto: number;
  estado: 'Aplicada' | 'Pendiente' | 'Cancelada';
}

export interface FacturaRecurrente {
  id: string;
  cliente: string;
  concepto: string;
  frecuencia: Frecuencia;
  proximaEmision: string;
  total: number;
  activa: boolean;
}

export interface DatosFiscales {
  razonSocial: string;
  rfc: string;
  regimenFiscal: string;
  codigoPostal: string;
  serie: string;
  siguienteFolio: number;
  tasaIva: number;
  retencionIsr: number;
  retencionIva: number;
  pacUsuario: string;
  pacApiKey: string;
}

export interface FacturacionApi {
  obtenerFacturas?: () => Promise<Factura[]>;
  guardarFactura?: (factura: Omit<Factura, 'id' | 'folio'>) => Promise<Factura>;
}

export interface ModuloFacturacionProps {
  basename?: string;
  apiBaseUrl?: string;
  api?: FacturacionApi;
  usuarioActual?: Usuario;
  onSalir?: () => void;
  tema?: 'claro' | 'oscuro';
}
