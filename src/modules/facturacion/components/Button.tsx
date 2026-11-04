import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variante = 'primario' | 'secundario' | 'neutro' | 'peligro' | 'texto';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { variante?: Variante; icono?: ReactNode; children: ReactNode; }

export function Button({ variante = 'neutro', icono, children, className = '', ...props }: Props) {
  return <button className={`fact-button fact-button--${variante} ${className}`} {...props}>{icono && <span className="fact-button__icon" aria-hidden="true">{icono}</span>}{children}</button>;
}
