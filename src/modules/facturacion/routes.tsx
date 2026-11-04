import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NuevaFactura from './pages/NuevaFactura';
import ListadoFacturas from './pages/ListadoFacturas';
import FacturasCanceladas from './pages/FacturasCanceladas';
import Pagos from './pages/Pagos';
import Cotizaciones from './pages/Cotizaciones';
import NotasCredito from './pages/NotasCredito';
import Recurrentes from './pages/Recurrentes';
import Clientes from './pages/Clientes';
import Productos from './pages/Productos';
import Reportes from './pages/Reportes';
import Configuracion from './pages/Configuracion';

export function FacturacionRoutes() {
  return <Routes>
    <Route index element={<Dashboard />} />
    <Route path="facturas/nueva" element={<NuevaFactura />} />
    <Route path="facturas" element={<ListadoFacturas />} />
    <Route path="canceladas" element={<FacturasCanceladas />} />
    <Route path="pagos" element={<Pagos />} />
    <Route path="cotizaciones" element={<Cotizaciones />} />
    <Route path="notas-credito" element={<NotasCredito />} />
    <Route path="recurrentes" element={<Recurrentes />} />
    <Route path="clientes" element={<Clientes />} />
    <Route path="productos" element={<Productos />} />
    <Route path="reportes" element={<Reportes />} />
    <Route path="configuracion" element={<Configuracion />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
