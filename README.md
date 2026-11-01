# Backend - API de Alertas y Cronogramas de Riego (Grupo 03)

API REST desarrollada con **NestJS** y **TypeScript** para la **Entrega 2** del curso de desarrollo de backend (ICINF1108). Su propósito principal es gestionar el cuidado de plantas en interiores o huertos urbanos, controlando especies, inventario de plantas, usuarios y registros históricos de riego.

---
## Arquitectura del Sistema

El proyecto sigue una arquitectura modular orientada a dominios utilizando **NestJS**, organizando la lógica de negocio por responsabilidades (controladores, servicios y validadores).

### Estructura de Carpetas
```text
src/
├── controllers/      # Controladores de la API (Endpoints / Rutas)
├── domain/           # Modelos del dominio y entidades en memoria
├── dto/              # Objetos de transferencia de datos y validaciones
├── repositories/     # Capa de persistencia y manejo de datos en memoria
├── schemas/          # Esquemas y validaciones complementarias
├── services/         # Lógica de negocio y reglas de la aplicación
├── app.controller.ts # Controlador principal
├── app.module.ts     # Módulo raíz de la aplicación
├── app.service.ts    # Servicio raíz
├── http-error.filter.ts # Filtro global de errores HTTP estructurados
└── main.ts           # Punto de entrada y configuración de Swagger
```
---
## Tecnologías y Herramientas

* **Framework:** [NestJS](https://nestjs.com/) (Node.js)
* **Lenguaje:** TypeScript
* **Validación de Datos:** `class-validator` & `class-transformer`
* **Documentación:** [Swagger / OpenAPI](https://swagger.io/)
* **Almacenamiento:** En memoria (listas/diccionarios, sin base de datos persistente para esta versión). <!-- editar -->

---

## Modelo del Dominio y Entidades

El sistema administra cuatro entidades principales con sus respectivas relaciones:

1. **Usuario:** `id`, `nombre`, `correo`, `nivel_experiencia`, `fecha_registro`.
2. **Especie:** `id`, `nombre_comun`, `nombre_cientifico`, `dias_entre_riegos`, `requerimiento_luz`.
3. **Planta (CRUD Completo):** `id`, `apodo`, `fecha_adquisicion`, `estado_salud`, `especie_id` *(Relación 1:N)*.
4. **RegistroRiego:** `id`, `fecha_riego`, `cantidad_ml`, `tipo_fertilizante`, `planta_id` *(Relación 1:N)*.

---

## Reglas de Negocio Principales

* **Fecha de Riego Válida:** Una planta no puede recibir un `RegistroRiego` con una fecha futura o mayor a la fecha actual de la solicitud.
* **Estado de Salud:** No se pueden registrar nuevos riegos si la planta tiene el `estado_salud` en `"Muerto"`.
* **Integridad Referencial:** Para registrar una planta, la especie referenciada en `especie_id` debe haber sido creada previamente.

---

## Contrato de la API (12 Endpoints)

### **Plantas (CRUD Completo)**
* `POST /plantas` - Crear una nueva planta.
* `GET /plantas` - Listar todas las plantas (soporta **filtrado, ordenamiento y paginación**).
* `GET /plantas/{id}` - Obtener una planta específica por ID.
* `PUT /plantas/{id}` - Actualizar los datos de una planta.
* `DELETE /plantas/{id}` - Eliminar una planta.

### **Otras Entidades y Operaciones**
* `POST /usuarios` - Registrar un nuevo usuario. (pendiente)
* `GET /usuarios/{id}` - Obtener información de un usuario. (pendiente)
* `POST /especies` - Registrar una nueva especie de planta.
* `GET /especies` - Listar todas las especies disponibles.
* `POST /plantas/{planta_id}/riegos` - Registrar un evento de riego para una planta.
* `GET /plantas/{planta_id}/riegos` - Listar el historial de riegos de una planta.
* `GET /usuarios/{id}/alertas-riego` - Calcular y listar riegos pendientes / alertas. (pendiente)

---

## Instalación y Configuración Local

Sigue estos pasos para poner en marcha el proyecto en tu entorno de desarrollo:

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd backend-2026-grupo-03
   ```

2. **Instalar las dependencias:**
   ```bash
   # Si usas PowerShell y tienes restricciones de ejecución de scripts:
   cmd /c npm install
   
   # O directamente en CMD / bash:
   npm install
   ```

---

##  Ejecución del Servidor

* **Modo Desarrollo**:
  ```bash
  cmd /c npm run start:dev
  ```

* **Modo Producción**:
  ```bash
  cmd /c npm run start:prod
  ```

---

## Documentación Interactiva (Swagger)

Una vez que el servidor esté en ejecución (`http://localhost:3000`), puedes explorar y probar todos los endpoints, esquemas y DTOs ingresando a:

 **`http://localhost:3000/api`**

---

## Desarrolladores del Proyecto 

| Nombre | Rol  | GitHub |
| :--- | :--- | :--- |
|**Camila Mardones** | Coordinación y seguimiento / | [@usuario-github](https://github.com/CMardones06) |
| **Josefa Duarte** | Calidad y Pruebas / | [@usuario-github](https://github.com/jjosefa) |
| **María Henríquez** | Api y lógica / Dominio y Datos| [@usuario-github](https://github.com/maria-hc) |
| **Keisy Epul** | Dominio y datos / Documentación e Integración | [@usuario-github](https://github.com/keiishiiEp) |