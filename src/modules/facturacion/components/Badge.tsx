import type { ReactNode } from 'react';
const estadoClases: Record<string, string> = { Pagada: 'success', Pendiente: 'warning', Emitida: 'info', Cancelada: 'danger', Aceptada: 'success', Aplicada: 'success', Enviada: 'info', Borrador: 'muted', Rechazada: 'danger', Convertida: 'muted' };
export function Badge({ estado, children }: { estado?: string; children?: ReactNode }) { const label = children ?? estado ?? ''; return <span className={`fact-badge fact-badge--${estadoClases[estado ?? String(label)] ?? 'muted'}`}>{label}</span>; }
