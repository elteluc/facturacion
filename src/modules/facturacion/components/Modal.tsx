import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
export function Modal({ abierto, titulo, onCerrar, children }: { abierto: boolean; titulo: string; onCerrar: () => void; children: ReactNode }) {
  useEffect(() => { if (!abierto) return; const cerrarEscape = (evento: KeyboardEvent) => { if (evento.key === 'Escape') onCerrar(); }; window.addEventListener('keydown', cerrarEscape); return () => window.removeEventListener('keydown', cerrarEscape); }, [abierto, onCerrar]);
  if (!abierto) return null;
  return <div className="fact-modal-backdrop" role="presentation" onMouseDown={(evento) => { if (evento.target === evento.currentTarget) onCerrar(); }}><section className="fact-modal" role="dialog" aria-modal="true" aria-labelledby="fact-modal-title"><header className="fact-modal__header"><h2 id="fact-modal-title">{titulo}</h2><button className="fact-icon-button" onClick={onCerrar} aria-label="Cerrar ventana"><X size={18} /></button></header><div className="fact-modal__body">{children}</div></section></div>;
}
