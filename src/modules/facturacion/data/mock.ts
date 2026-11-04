import type { Cliente, Cotizacion, DatosFiscales, Factura, FacturaRecurrente, NotaCredito, Pago, Producto } from '../types';

export const clientesMock: Cliente[] = [
  { id: 'cli-1', nombre: 'Constructora del Valle, S.A. de C.V.', rfc: 'CVA1103158K2', regimenFiscal: '601 - General de Ley Personas Morales', direccion: 'Av. Insurgentes Sur 1458, CDMX, 03920', correo: 'pagos@constructoradelvalle.mx', telefono: '55 5555 0182', usoCfdi: 'G03' },
  { id: 'cli-2', nombre: 'Mariana López Hernández', rfc: 'LOHM900723QW4', regimenFiscal: '612 - Personas Físicas con Actividades Empresariales', direccion: 'Calle Olmo 218, Guadalajara, JAL, 44100', correo: 'mariana.lopez@email.mx', telefono: '33 3614 2290', usoCfdi: 'G03' },
  { id: 'cli-3', nombre: 'Grupo Nopal del Norte, S. de R.L.', rfc: 'GNN1809063M1', regimenFiscal: '601 - General de Ley Personas Morales', direccion: 'Blvd. Díaz Ordaz 880, Monterrey, NL, 64650', correo: 'administracion@nopalnorte.mx', telefono: '81 8000 1830', usoCfdi: 'G01' },
  { id: 'cli-4', nombre: 'Sofía Ramírez Torres', rfc: 'RATS850211PZ9', regimenFiscal: '612 - Personas Físicas con Actividades Empresariales', direccion: 'Calle 60 412, Mérida, YUC, 97000', correo: 'sofia.ramirez@email.mx', telefono: '999 920 4418', usoCfdi: 'S01' },
  { id: 'cli-5', nombre: 'Tecnología Cobalto, S.A.P.I. de C.V.', rfc: 'TCO200417H65', regimenFiscal: '601 - General de Ley Personas Morales', direccion: 'Paseo de la Reforma 296, CDMX, 06600', correo: 'facturas@cobalto.tech', telefono: '55 1102 7834', usoCfdi: 'G03' },
  { id: 'cli-6', nombre: 'Café Estación Central, S.A. de C.V.', rfc: 'CEC1608225B7', regimenFiscal: '601 - General de Ley Personas Morales', direccion: 'Av. Vallarta 1932, Guadalajara, JAL, 44130', correo: 'contabilidad@estacioncentral.mx', telefono: '33 3121 8840', usoCfdi: 'G03' },
];

export const productosMock: Producto[] = [
  { id: 'prod-1', claveSat: '81112100', nombre: 'Desarrollo de software a medida', unidad: 'E48 - Servicio', precio: 18500, iva: 16, categoria: 'Servicios profesionales' },
  { id: 'prod-2', claveSat: '80161500', nombre: 'Consultoría de procesos', unidad: 'E48 - Servicio', precio: 9200, iva: 16, categoria: 'Consultoría' },
  { id: 'prod-3', claveSat: '43231500', nombre: 'Licencia de plataforma mensual', unidad: 'E48 - Servicio', precio: 2400, iva: 16, categoria: 'Software' },
  { id: 'prod-4', claveSat: '78101800', nombre: 'Logística y entrega local', unidad: 'E48 - Servicio', precio: 850, iva: 16, categoria: 'Logística' },
  { id: 'prod-5', claveSat: '80141600', nombre: 'Diseño de identidad visual', unidad: 'E48 - Servicio', precio: 6800, iva: 16, categoria: 'Diseño' },
];

const concepto = (id: string, claveSat: string, descripcion: string, cantidad: number, precioUnitario: number) => ({
  id, claveSat, descripcion, unidad: 'E48 - Servicio', cantidad, precioUnitario, iva: 16,
});

export const facturasMock: Factura[] = [
  { id: 'fac-1', folio: 'F-2026-0084', clienteId: 'cli-1', cliente: clientesMock[0].nombre, rfc: clientesMock[0].rfc, fecha: '2026-09-30', vencimiento: '2026-10-30', subtotal: 18500, iva: 2960, retenciones: 0, total: 21460, estado: 'Pendiente', metodoPago: 'PPD', formaPago: 'Por definir', conceptos: [concepto('con-1', '81112100', 'Desarrollo de software a medida', 1, 18500)] },
  { id: 'fac-2', folio: 'F-2026-0083', clienteId: 'cli-5', cliente: clientesMock[4].nombre, rfc: clientesMock[4].rfc, fecha: '2026-09-30', vencimiento: '2026-09-30', subtotal: 9200, iva: 1472, retenciones: 0, total: 10672, estado: 'Pagada', metodoPago: 'PUE', formaPago: 'Transferencia', conceptos: [concepto('con-2', '80161500', 'Consultoría de procesos', 1, 9200)] },
  { id: 'fac-3', folio: 'F-2026-0082', clienteId: 'cli-3', cliente: clientesMock[2].nombre, rfc: clientesMock[2].rfc, fecha: '2026-09-29', vencimiento: '2026-10-29', subtotal: 24000, iva: 3840, retenciones: 0, total: 27840, estado: 'Emitida', metodoPago: 'PPD', formaPago: 'Por definir', conceptos: [concepto('con-3', '43231500', 'Licencia de plataforma mensual', 10, 2400)] },
  { id: 'fac-4', folio: 'F-2026-0081', clienteId: 'cli-2', cliente: clientesMock[1].nombre, rfc: clientesMock[1].rfc, fecha: '2026-09-27', vencimiento: '2026-09-27', subtotal: 6800, iva: 1088, retenciones: 0, total: 7888, estado: 'Pagada', metodoPago: 'PUE', formaPago: 'Tarjeta', conceptos: [concepto('con-4', '80141600', 'Diseño de identidad visual', 1, 6800)] },
  { id: 'fac-5', folio: 'F-2026-0079', clienteId: 'cli-6', cliente: clientesMock[5].nombre, rfc: clientesMock[5].rfc, fecha: '2026-09-21', vencimiento: '2026-10-21', subtotal: 18500, iva: 2960, retenciones: 0, total: 21460, estado: 'Cancelada', metodoPago: 'PPD', formaPago: 'Por definir', conceptos: [concepto('con-5', '81112100', 'Desarrollo de software a medida', 1, 18500)], cancelacion: { motivo: 'Solicitud del cliente', fecha: '2026-09-22', usuario: 'Lucía Fernández' } },
  { id: 'fac-6', folio: 'F-2026-0078', clienteId: 'cli-4', cliente: clientesMock[3].nombre, rfc: clientesMock[3].rfc, fecha: '2026-09-18', vencimiento: '2026-10-18', subtotal: 9200, iva: 1472, retenciones: 0, total: 10672, estado: 'Pendiente', metodoPago: 'PPD', formaPago: 'Por definir', conceptos: [concepto('con-6', '80161500', 'Consultoría de procesos', 1, 9200)] },
];

export const pagosMock: Pago[] = [
  { id: 'pag-1', facturaId: 'fac-2', folioFactura: 'F-2026-0083', cliente: clientesMock[4].nombre, fecha: '2026-09-30', monto: 10672, formaPago: 'Transferencia', referencia: 'SPEI-483921' },
  { id: 'pag-2', facturaId: 'fac-1', folioFactura: 'F-2026-0084', cliente: clientesMock[0].nombre, fecha: '2026-09-30', monto: 10000, formaPago: 'Transferencia', referencia: 'SPEI-483875' },
  { id: 'pag-3', facturaId: 'fac-4', folioFactura: 'F-2026-0081', cliente: clientesMock[1].nombre, fecha: '2026-09-27', monto: 7888, formaPago: 'Tarjeta', referencia: 'TARJ-290184' },
];

export const cotizacionesMock: Cotizacion[] = [
  { id: 'cot-1', folio: 'COT-2026-0031', cliente: clientesMock[2].nombre, fecha: '2026-09-29', vigencia: '2026-10-29', total: 27840, estado: 'Enviada' },
  { id: 'cot-2', folio: 'COT-2026-0030', cliente: clientesMock[0].nombre, fecha: '2026-09-26', vigencia: '2026-10-10', total: 21460, estado: 'Aceptada' },
  { id: 'cot-3', folio: 'COT-2026-0029', cliente: clientesMock[5].nombre, fecha: '2026-09-20', vigencia: '2026-10-20', total: 7888, estado: 'Borrador' },
  { id: 'cot-4', folio: 'COT-2026-0028', cliente: clientesMock[1].nombre, fecha: '2026-09-14', vigencia: '2026-09-28', total: 10672, estado: 'Convertida' },
];

export const notasCreditoMock: NotaCredito[] = [
  { id: 'nc-1', folio: 'NC-2026-0006', facturaOriginal: 'F-2026-0079', cliente: clientesMock[5].nombre, fecha: '2026-09-22', motivo: 'Devolución del servicio', monto: 21460, estado: 'Aplicada' },
  { id: 'nc-2', folio: 'NC-2026-0005', facturaOriginal: 'F-2026-0072', cliente: clientesMock[0].nombre, fecha: '2026-09-18', motivo: 'Descuento comercial', monto: 2500, estado: 'Pendiente' },
  { id: 'nc-3', folio: 'NC-2026-0004', facturaOriginal: 'F-2026-0068', cliente: clientesMock[4].nombre, fecha: '2026-09-10', motivo: 'Corrección de importe', monto: 1200, estado: 'Aplicada' },
];

export const recurrentesMock: FacturaRecurrente[] = [
  { id: 'rec-1', cliente: clientesMock[4].nombre, concepto: 'Licencias de plataforma', frecuencia: 'Mensual', proximaEmision: '2026-10-01', total: 27840, activa: true },
  { id: 'rec-2', cliente: clientesMock[1].nombre, concepto: 'Soporte y mantenimiento', frecuencia: 'Mensual', proximaEmision: '2026-10-05', total: 7888, activa: true },
  { id: 'rec-3', cliente: clientesMock[2].nombre, concepto: 'Consultoría trimestral', frecuencia: 'Trimestral', proximaEmision: '2026-10-15', total: 10672, activa: false },
];

export const datosFiscalesMock: DatosFiscales = {
  razonSocial: 'Estudio Norte Digital, S.A. de C.V.', rfc: 'END190514KJ3', regimenFiscal: '601 - General de Ley Personas Morales', codigoPostal: '03100', serie: 'F', siguienteFolio: 85, tasaIva: 16, retencionIsr: 0, retencionIva: 0, pacUsuario: '', pacApiKey: '',
};

export const ventasSemanaMock = [
  { dia: '24 sep', total: 18200 }, { dia: '25 sep', total: 26400 }, { dia: '26 sep', total: 19800 },
  { dia: '27 sep', total: 32600 }, { dia: '28 sep', total: 24100 }, { dia: '29 sep', total: 38700 }, { dia: '30 sep', total: 32132 },
];
