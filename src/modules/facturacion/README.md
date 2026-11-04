# Modulo de facturacion

Modulo React con rutas y estado internos, datos de demostracion en espanol y estilos bajo el prefijo `.fact-`. El estado Zustand se crea por instancia, por lo que dos montajes no comparten sus cambios.

## Requisitos e instalacion

El proyecto anfitrion debe tener React 18 y React DOM instalados. Instala las dependencias usadas por el modulo:

```bash
npm install react-router-dom zustand lucide-react date-fns recharts
```

El codigo fuente tambien requiere TypeScript y Tailwind CSS 3 para compilar con la configuracion incluida en la raiz de este proyecto. React y React DOM son dependencias peer; las demas dependencias deben estar disponibles para el empaquetador del proyecto anfitrion.

## Integracion en React

Copia `src/modules/facturacion` en el proyecto y conserva el CSS del modulo. Importa el componente desde el punto de entrada:

```tsx
import { ModuloFacturacion } from './modules/facturacion';

export function App() {
  return <ModuloFacturacion basename="/facturacion" />;
}
```

El modulo crea su propio `MemoryRouter`: los enlaces y rutas son internos y no requieren un `BrowserRouter` anfitrion ni modifican la URL del navegador. `basename` establece el prefijo que el router reconoce para sus entradas internas. Las rutas disponibles incluyen `/`, `/facturas`, `/facturas/nueva`, `/clientes`, `/productos`, `/pagos`, `/cotizaciones`, `/notas-credito`, `/recurrentes`, `/canceladas`, `/reportes` y `/configuracion`.

En Next.js, monta el componente desde un componente cliente (`'use client'`). En Vue o HTML puro se necesita un wrapper que monte React con `createRoot`; el modulo no incluye un custom element ni un adaptador Vue.

## Props

- `basename?: string`: prefijo interno de rutas; por defecto `/facturacion`.
- `apiBaseUrl?: string`: base REST opcional. Si no se proporciona `api`, se usa `GET {apiBaseUrl}/facturas` para cargar y `POST {apiBaseUrl}/facturas` para emitir. El POST recibe los datos de la factura y debe responder con una factura completa, incluidos `id` y `folio`.
- `api?: FacturacionApi`: adaptador opcional con `obtenerFacturas()` y/o `guardarFactura(factura)`. Si se proporciona, tiene prioridad sobre `apiBaseUrl`.
- `usuarioActual?: Usuario`: nombre, correo y rol que se muestran en el encabezado.
- `onSalir?: () => void`: callback del boton de salida.
- `tema?: 'claro' | 'oscuro'`: tema interno; por defecto `claro`.

Ejemplo con un adaptador:

```tsx
<ModuloFacturacion
  api={{
    obtenerFacturas: () => fetch('/api/facturas').then((respuesta) => respuesta.json()),
    guardarFactura: async (factura) => {
      const respuesta = await fetch('/api/facturas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(factura),
      });
      if (!respuesta.ok) throw new Error('No se pudo guardar la factura');
      return respuesta.json();
    },
  }}
  usuarioActual={{ id: 'usr-1', nombre: 'Ana Perez', rol: 'Administradora' }}
/>
```

Los datos locales se usan inicialmente como demostracion y respaldo cuando no hay una API de lectura configurada. Para conectar otros recursos, implementa sus metodos en una capa de servicio propia y conecta esa capa al store; los recursos CRUD de clientes y productos siguen usando el store local.

## Estilos y colores

`styles/facturacion.css` limita sus selectores al contenedor `.fact-module`, incluye el reset local y define variables CSS para fondo, superficies, colores de estado, texto y bordes. Para personalizar la paleta, sobrescribe las variables desde una hoja cargada despues del CSS del modulo:

```css
.fact-module {
  --fact-primary: #2563eb;
  --fact-primary-hover: #1d4ed8;
  --fact-bg: #f8fafc;
}
```

El modulo no importa estilos de Tailwind del anfitrion. Las directivas Tailwind requeridas para el build se procesan con la configuracion del proyecto que compila el modulo.

## Empaquetado y aislamiento de rutas

Las rutas se mantienen en un `MemoryRouter` privado, asi que no se anidan en el router de la aplicacion anfitriona y no colisionan con sus rutas. Si se necesita que cada navegacion cambie la URL del navegador, se debe sustituir este router privado por una integracion con `RouterProvider`/`Routes` del anfitrion y reservar el prefijo configurado para el modulo.
