# MariCar App

Aplicacion web de alquiler de vehiculos construida con React y Node.js.

## Arquitectura

La aplicacion se divide en dos proyectos independientes:

- **maricar-app-front**: Cliente desarrollado con React 19 y Vite 8.
- **maricar-app-back**: Servidor API REST desarrollado con Express 5.

## Tecnologias

### Frontend

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| React | 19 | Libreria de interfaz de usuario |
| Vite | 8 | Empaquetador y servidor de desarrollo |
| React Router | 8 | Enrutamiento del lado del cliente |
| Sass | 1.101 | Preprocesador de CSS |
| flatpickr | 4.6 | Calendario de seleccion de fechas |
| SweetAlert2 | 11 | Dialogos y confirmaciones |
| Prop-Types | 15 | Validacion de propiedades |

### Backend

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Express | 5 | Framework HTTP |
| Mongoose | 9 | ODM para MongoDB |
| bcryptjs | 3 | Hash de contrasenas |
| jsonwebtoken | 9 | Tokens JWT de autenticacion |
| multer | 2 | Subida de archivos (imagenes) |
| nodemailer | 9 | Envio de correos electronicos |
| express-validator | 7 | Validacion de datos de entrada |
| cors | 2 | Control de acceso跨域 |
| dotenv | 17 | Variables de entorno |

### Base de datos

- **MongoDB**: Base de datos NoSQL documental.

## Funcionalidades

### Publicas

- Pagina de inicio con imagen de bienvenida (`welcome.png`).
- Catalogo de vehiculos con listado completo en tarjetas horizontales.
- Detalle de vehiculo con foto, datos y calendario de disponibilidad (flatpickr).
- Formulario de contacto/reserva con envio de correo electronico (Ethereal).
- Registro e inicio de sesion de usuarios.

### Autenticacion

- Registro de usuarios con nombre, email, contrasena y datos personales.
- Inicio de sesion con generacion de token JWT.
- Proteccion de rutas segun rol (admin / user).
- Almacenamiento del token en localStorage.

### Administrador

- CRUD completo de vehiculos (crear, listar, editar, eliminar).
- Subida de imagenes con multer (5MB max, solo jpg/png/gif/webp).
- Gestion de disponibilidad por rangos de fechas con flatpickr (anadir/eliminar).
- CRUD completo de usuarios.
- Edicion de contrasena con hash bcrypt (incluso via `findByIdAndUpdate`).

### Usuario

- Panel de usuario con informacion personal y avatar (ui-avatars.com).
- Visualizacion de reservas (pendiente de implementacion, actualmente muestra "Aun no tienes reservas").
- Boton de cerrar sesion.

## Estructura del Proyecto

```
maricar-app/
  docs/
    documentacion-tecnica.pdf   Documentacion detallada para la presentacion
    presentacion-guion.pdf      Guion de presentacion (10 min)
    ppt/
      MariCar-Presentacion.pptx Presentacion PowerPoint
  maricar-app-back/
    src/
      controllers/     Logica de negocio
      middlewares/      Middlewares (auth, upload, validacion)
      models/           Modelos de Mongoose
      routes/           Definicion de rutas
      app.js            Punto de entrada del servidor
    uploads/            Imagenes subidas (efimero en Render)
  maricar-app-front/
    public/
      logo.png          Logo de la aplicacion (redirige a home)
      welcome.png       Imagen de bienvenida en la pagina de inicio
    src/
      components/
        admin/          Componentes del panel de administracion
        public/         Componentes de la parte publica
        user/           Componentes del panel de usuario
      routes/           Configuracion de rutas
      styles/           Archivos Sass (variables, mixins)
      App.jsx           Componente principal (header con logo + NavLink)
      AuthContext.jsx   Contexto de autenticacion
```

## Instalacion y Ejecucion

### Requisitos

- Node.js 18 o superior.
- MongoDB (local o Atlas).
- Cuenta en Render (opcional, para despliegue).

### Backend

```bash
cd maricar-app-back
npm install
cp .env.example .env
```

Editar el archivo `.env` con los valores correspondientes:

```
MONGO_URI=mongodb+srv://usuario:contrasena@cluster.mongodb.net/maricar
JWT_SECRET=clave_secreta
JWT_EXPIRES_IN=1d
```

Iniciar el servidor:

```bash
npm run dev
```

El servidor se ejecutara en `http://localhost:3000`.

### Frontend

```bash
cd maricar-app-front
npm install
cp .env.example .env
```

Editar el archivo `.env`:

```
VITE_API_URLBASE=http://localhost:3000/api/v1
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicacion se abrira en `http://localhost:5173`.

## Variables de Entorno

### Backend

| Variable | Descripcion | Obligatoria |
|----------|-------------|-------------|
| `MONGO_URI` | Cadena de conexion a MongoDB | Si |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT | Si |
| `JWT_EXPIRES_IN` | Tiempo de expiracion del token (por defecto: `1d`) | No |

### Frontend

| Variable | Descripcion | Obligatoria |
|----------|-------------|-------------|
| `VITE_API_URLBASE` | URL base de la API backend | Si |

## API REST

### Autenticacion

| Metodo | Ruta | Autenticacion | Descripcion |
|--------|------|---------------|-------------|
| POST | `/api/v1/auth/register` | No | Registrar un nuevo usuario |
| POST | `/api/v1/auth/login` | No | Iniciar sesion |

### Vehiculos

| Metodo | Ruta | Autenticacion | Descripcion |
|--------|------|---------------|-------------|
| GET | `/api/v1/cars` | No | Obtener todos los vehiculos |
| GET | `/api/v1/cars/:id` | No | Obtener un vehiculo por ID |
| POST | `/api/v1/cars` | Admin | Crear un nuevo vehiculo (multipart) |
| PUT | `/api/v1/cars/:id` | Admin | Actualizar un vehiculo (multipart) |
| DELETE | `/api/v1/cars/:id` | Admin | Eliminar un vehiculo |

### Usuarios

| Metodo | Ruta | Autenticacion | Descripcion |
|--------|------|---------------|-------------|
| GET | `/api/v1/users` | Admin | Obtener todos los usuarios |
| GET | `/api/v1/users/:id` | Admin | Obtener un usuario por ID |
| POST | `/api/v1/users` | Admin | Crear un usuario |
| PUT | `/api/v1/users/:id` | Admin | Actualizar un usuario |
| DELETE | `/api/v1/users/:id` | Admin | Eliminar un usuario |

### Contacto

| Metodo | Ruta | Autenticacion | Descripcion |
|--------|------|---------------|-------------|
| POST | `/api/v1/contact` | No | Enviar mensaje de contacto por email |

## Despliegue

### Render (Backend)

1. Crear un nuevo Web Service en Render.
2. Conectar el repositorio de GitHub.
3. Establecer el comando de inicio: `node src/app.js`.
4. Configurar las variables de entorno en el panel de Render.
5. El directorio `uploads/` es efimero: las imagenes se pierden tras un reinicio del contenedor.

### Vercel (Frontend)

1. Conectar el repositorio a Vercel.
2. Configurar el framework como Vite.
3. Anadir la variable de entorno `VITE_API_URLBASE` con la URL del backend en Render.

## Consideraciones

- Las imagenes subidas se almacenan localmente en `uploads/` y se sirven como archivos estaticos. En Render, este directorio es efimero y se pierde al reiniciar el contenedor.
- El token JWT se almacena en localStorage. No se utilizan cookies httpOnly por simplicidad.
- El envio de correos se realiza mediante Ethereal, un servicio de correo ficticio para desarrollo. Los mensajes no se entregan realmente, pero se puede acceder a una previsualizacion desde la consola del servidor.
- Los estilos se escriben con Sass utilizando los parciales `_variables.scss` y `_mixins.scss`, importados mediante la directiva `@use`.
- El calendario de disponibilidad utiliza flatpickr en modo rango, deshabilitando las fechas ocupadas definidas en cada vehiculo.
- El logo en el header redirige a la pagina principal mediante `<NavLink to="/">`.
- Al editar un usuario, si se modifica la contrasena, se hashea manualmente con bcrypt antes de llamar a `findByIdAndUpdate` (porque este metodo no ejecuta el hook `pre("save")` de Mongoose).
- Las tarjetas de coches usan un layout horizontal (`.card-horizontal`) con imagen a la izquierda y contenido a la derecha, adaptable a movil con el mixin `responsive(md)`.
