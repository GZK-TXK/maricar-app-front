# MariCar App — Frontend

SPA del proyecto **MariCar** (alquiler de vehículos). React 19 + Vite 8.

## Stack

- React 19, Vite 8, React Router 8
- Estilos: Sass (tokens + mobile-first)
- Calendario: flatpickr
- Diálogos: SweetAlert2
- Tests: Vitest + Testing Library

## Requisitos

- Node.js 18+
- Backend en marcha (ver `../maricar-app-back`)

## Instalación

```bash
npm install
cp .env.example .env
```

`.env`:

```
VITE_API_URLBASE=http://localhost:3000/api/v1
```

## Scripts

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo (http://localhost:5173) |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | ESLint |
| `npm test` | Tests (Vitest + Testing Library) |
| `npm run test:watch` | Tests en modo watch |

## Arquitectura

```
src/
├── api/             Cliente HTTP centralizado + módulos por recurso
│                    (client, auth, cars, users, reservations, admin, contact)
├── components/      Componentes por área
│   ├── public/      Home, catálogo, detalle, booking, auth
│   ├── admin/       Panel de administración (coches, usuarios, reservas)
│   ├── user/        Dashboard y detalle de reserva
│   ├── ErrorBoundary.jsx
│   └── Loader.jsx
├── routes/          AppRoutes (lazy loading + Suspense)
├── styles/          _variables.scss (tokens), _mixins.scss
├── AuthContext.jsx  Sesión (cookie httpOnly) + /auth/me
├── App.jsx          Header + rutas
└── main.jsx         Entrada
```

- **Cliente API**: todas las peticiones pasan por `src/api/client.js` (usa `credentials: "include"` y maneja los errores con `ApiError`).
- **Autenticación**: el token va en cookie httpOnly; el front **no** lo almacena.

## Rutas

- **Públicas:** `/`, `/cars`, `/car/:id`, `/login`, `/register`, `/forgot-password`, `/reset-password`.
- **Usuario:** `/dashboard`, `/reservations/:id`, `/reservar/:carId`, `/reservar/confirmacion`, `/reservar/cancelado`.
- **Admin:** `/admin`, `/admin/cars`, `/admin/cars/create`, `/admin/cars/:id`, `/admin/users`, `/admin/reservations`.

## Estilos

- Tokens en `src/styles/_variables.scss` (paleta de blancos, grises y verde clarito).
- Enfoque **mobile-first** con el mixin `from($bp)` (media queries `min-width`).
- Estilos globales en `src/index.scss` y `src/App.scss`.

## Tests

```bash
npm test
```

10 tests (cliente API, Loader, ErrorBoundary, Pagination) con Vitest + Testing Library.
