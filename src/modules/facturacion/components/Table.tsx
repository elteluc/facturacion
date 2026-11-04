import type { ReactNode } from 'react';
export interface Columna<T> { clave: string; titulo: string; render: (fila: T) => ReactNode; className?: string; }
export function Table<T extends { id: string }>({ columnas, filas, vacio = 'No hay registros para mostrar.' }: { columnas: Columna<T>[]; filas: T[]; vacio?: string }) {
  return <div className="fact-table-wrap"><table className="fact-table"><thead><tr>{columnas.map((columna) => <th key={columna.clave} className={columna.className}>{columna.titulo}</th>)}</tr></thead><tbody>{filas.length ? filas.map((fila) => <tr key={fila.id}>{columnas.map((columna) => <td key={columna.clave} className={columna.className}>{columna.render(fila)}</td>)}</tr>) : <tr><td colSpan={columnas.length} className="fact-table__empty">{vacio}</td></tr>}</tbody></table></div>;
}
