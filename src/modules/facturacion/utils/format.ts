import { format, parseISO, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

const monedaMx = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 2 });

export function formatoMoneda(valor: number): string {
  return monedaMx.format(Number.isFinite(valor) ? valor : 0);
}

export function formatoFecha(fecha: string | Date, patron = 'd MMM yyyy'): string {
  const valor = typeof fecha === 'string' ? parseISO(fecha) : fecha;
  return isValid(valor) ? format(valor, patron, { locale: es }) : 'Fecha no disponible';
}
