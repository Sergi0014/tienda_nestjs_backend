# API Tienda - Backend NestJS

API REST para gestión de tienda con NestJS, Prisma y PostgreSQL.

##  Características

- ✅ CRUD de productos
- ✅ CRUD de clientes
- ✅ Sistema de ventas
- ✅ Documentación automática con Swagger
- ✅ Validación de datos con class-validator
- ✅ Base de datos PostgreSQL con Prisma ORM
- ✅ Health check endpoint
- ✅ Configuración para despliegue en Render

## 📋 Requisitos

- Node.js 18+
- PostgreSQL
- npm o yarn

## Instalación local

1. Clona el repositorio:

```bash
git clone <tu-repositorio>
cd backend_nest_tienda
```

2. Instala dependencias:

```bash
npm install
```

3. Configura variables de entorno:

```bash
cp .env.example .env
# Edita .env con tus datos de PostgreSQL
```

4. Ejecuta migraciones:

```bash
npx prisma migrate deploy
npx prisma generate
```

5. Inicia la aplicación:

```bash
npm run start:dev
```

## Despliegue en Render con Supabase

### Paso 1: Preparar repositorio

1. Sube tu código a GitHub
2. Asegúrate de que el archivo `render.yaml` esté en la raíz
3. La configuración ya incluye la conexión a Supabase

### Paso 2: Crear cuenta en Render

1. Ve a [render.com](https://render.com)
2. Crea una cuenta gratuita
3. Conecta tu cuenta de GitHub

### Paso 3: Desplegar la aplicación

1. En el dashboard, haz clic en "New +"
2. Selecciona "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Name**: `backend-nest-tienda`
   - **Environment**: Node
   - **Region**: Oregon (recomendado)
   - **Branch**: main (o la rama que uses)
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm run render:start`
5. **En "Advanced Settings"**, agrega la variable de entorno manualmente:
   - **Key**: `DATABASE_URL`
   - **Value**: Tu URL de Supabase completa (copia desde tu archivo .env local)
   - Ejemplo: `postgresql://postgres.xxx:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres`
6. Las otras variables (`NODE_ENV` y `PORT`) se configuran automáticamente desde `render.yaml`
7. Haz clic en "Create Web Service"

### Paso 4: Verificar el despliegue

1. Espera a que termine el build (puede tomar 5-10 minutos)
2. Una vez completado, ve a la URL de tu servicio
3. Verifica que `/api` muestre la documentación de Swagger
4. Verifica que `/` muestre el health check

##  Documentación API

Una vez desplegado, la documentación estará disponible en:

- **Local**: `http://localhost:3000/api`
- **Producción**: `https://tu-app.onrender.com/api`

## 🔗 Endpoints principales

- `GET /` - Health check
- `GET /api` - Documentación Swagger
- `GET /product` - Listar productos
- `POST /product` - Crear producto
- `GET /client` - Listar clientes
- `POST /client` - Crear cliente
- `GET /venta` - Listar ventas
- `POST /venta` - Crear venta

##  Notas importantes para producción

1. **Base de datos**: Usa Supabase PostgreSQL (configura `DATABASE_URL` manualmente en Render)
2. **Puerto**: La aplicación está configurada para usar `process.env.PORT`
3. **CORS**: Habilitado para todos los orígenes en producción
4. **Health check**: Configurado en `/` para Render
5. **Migraciones**: Se ejecutan automáticamente en cada deploy
6. **Seguridad**: La URL de base de datos no está hardcodeada en el código

## 🔧 Scripts disponibles

- `npm run start:dev` - Desarrollo con hot reload
- `npm run build` - Construir para producción
- `npm run start:prod` - Ejecutar en producción
- `npm run render:start` - Comando de inicio para Render
- `npm test` - Ejecutar tests

## Solución de problemas

### Error de conexión a base de datos

- Verifica que `DATABASE_URL` esté configurada correctamente
- Asegúrate de que la base de datos PostgreSQL esté activa

### Error de build en Render

- Revisa los logs de build en el dashboard de Render
- Verifica que todas las dependencias estén en `package.json`

### Error 503 en health check

- Verifica que la aplicación esté escuchando en `0.0.0.0` y no solo `localhost`
- Confirma que el puerto sea `process.env.PORT`

##  Licencia

Este proyecto está bajo licencia UNLICENSED.

- CRUD de clientes
- Gestión de ventas
- Documentación automática con Swagger
- Base de datos PostgreSQL con Prisma ORM

## Despliegue en Render

### Requisitos previos

1. Cuenta en [Render](https://render.com)
2. Repositorio en GitHub con tu código

### Pasos para desplegar:

#### 1. **Crear base de datos PostgreSQL en Render:**

- Ve a tu dashboard de Render
- Clic en "New" > "PostgreSQL"
- Completa los siguientes campos:
  - Name: `tienda-db`
  - Database: `tienda`
  - User: `tienda_user`
  - Region: `Oregon (US West)` (o la más cercana)
  - Plan: `Free`
- Clic en "Create Database"
- **IMPORTANTE:** Guarda la "External Database URL" que aparece

#### 2. **Configurar el servicio web:**

- Ve a tu dashboard de Render
- Clic en "New" > "Web Service"
- Conecta tu repositorio de GitHub
- Completa la configuración:
  - Name: `backend-nest-tienda`
  - Environment: `Node`
  - Region: `Oregon (US West)` (mismo que la BD)
  - Branch: `main` (o tu rama principal)
  - Build Command: `npm ci && npx prisma generate && npm run build`
  - Start Command: `npm run render:start`

#### 3. **Configurar variables de entorno:**

En la sección "Environment Variables" del servicio web, agrega:

```
NODE_ENV=production
PORT=10000
DATABASE_URL=[URL de tu base de datos PostgreSQL]
```

**Para obtener la DATABASE_URL:**

- Ve a tu base de datos PostgreSQL en Render
- Copia la "External Database URL"
- Pégala como valor de DATABASE_URL

#### 4. **Desplegar:**

- Clic en "Create Web Service"
- Render automáticamente:
  - Clonará tu repositorio
  - Instalará dependencias
  - Generará el cliente de Prisma
  - Construirá la aplicación
  - Ejecutará las migraciones
  - Iniciará el servidor

#### 5. **Verificar el despliegue:**

Una vez completado, tu API estará disponible en:

```
https://backend-nest-tienda.onrender.com
```

**Endpoints disponibles:**

- `GET /api` - Documentación de Swagger
- `GET /api-json` - OpenAPI JSON
- `GET /product` - Lista de productos
- `GET /client` - Lista de clientes
- `GET /venta` - Lista de ventas

### Solución de problemas comunes:

#### Error de conexión a base de datos:

- Verifica que la DATABASE_URL esté correctamente configurada
- Asegúrate de que la base de datos esté en la misma región

#### Error de build:

- Verifica que todas las dependencias estén en package.json
- Revisa los logs de build en Render

#### Error de migraciones:

- Las migraciones se ejecutan automáticamente
- Si hay errores, revisa los logs del servicio

#### Puerto ocupado o no disponible:

- Render asigna automáticamente el puerto
- Usa `process.env.PORT` en tu aplicación

### Monitoreo y logs:

- Ve a tu servicio en Render
- Clic en "Logs" para ver los logs en tiempo real
- Clic en "Metrics" para ver el rendimiento

### Auto-deploy:

Para habilitar el despliegue automático cuando hagas push:

- Ve a la configuración de tu servicio
- Habilita "Auto-Deploy: Yes"

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
