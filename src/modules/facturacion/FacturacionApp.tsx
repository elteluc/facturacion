import { MemoryRouter } from 'react-router-dom';
import { FacturacionProvider } from './context/FacturacionContext';
import { Layout } from './components/Layout';
import { FacturacionRoutes } from './routes';
import type { ModuloFacturacionProps } from './types';
import './styles/facturacion.css';

function limpiarBasename(basename: string) {
  const conBarraInicial = basename.startsWith('/') ? basename : `/${basename}`;
  return conBarraInicial.length > 1 ? conBarraInicial.replace(/\/$/, '') : conBarraInicial;
}

export default function FacturacionApp({ basename = '/facturacion', apiBaseUrl, api, usuarioActual, onSalir, tema = 'claro' }: ModuloFacturacionProps) {
  const rutaBase = limpiarBasename(basename);
  return <div className={`fact-module fact-theme-${tema}`} data-facturacion-root="true">
    <FacturacionProvider apiBaseUrl={apiBaseUrl} api={api} tema={tema}>
      <MemoryRouter basename={rutaBase} initialEntries={[`${rutaBase}/`]}>
        <Layout usuario={usuarioActual} onSalir={onSalir}><FacturacionRoutes /></Layout>
      </MemoryRouter>
    </FacturacionProvider>
  </div>;
}
