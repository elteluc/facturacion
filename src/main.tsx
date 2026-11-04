import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './modules/facturacion/styles/tailwind.css';
import FacturacionApp from './modules/facturacion/FacturacionApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FacturacionApp />
  </StrictMode>,
);
