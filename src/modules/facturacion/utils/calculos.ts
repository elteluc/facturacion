import type { ConceptoFactura } from '../types';

export interface TotalesFactura {
  subtotal: number;
  iva: number;
  retencionIsr: number;
  retencionIva: number;
  retenciones: number;
  total: number;
}

export function calcularTotales(conceptos: ConceptoFactura[], retencionIsr = 0, retencionIva = 0): TotalesFactura {
  const subtotal = conceptos.reduce((suma, item) => suma + item.cantidad * item.precioUnitario - (item.descuento ?? 0), 0);
  const iva = conceptos.reduce((suma, item) => suma + (item.cantidad * item.precioUnitario - (item.descuento ?? 0)) * item.iva / 100, 0);
  const retenciones = subtotal * (retencionIsr + retencionIva) / 100;
  return { subtotal, iva, retencionIsr: subtotal * retencionIsr / 100, retencionIva: subtotal * retencionIva / 100, retenciones, total: subtotal + iva - retenciones };
}
