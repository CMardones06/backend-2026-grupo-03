# Registro de Retroalimentación y Mejoras - Grupo 03

Este documento registra las observaciones recibidas en las Entregas I y II, detallando las acciones aplicadas para la versión final (1.0) y su estado de comprobación.

| ID / Observación recibida | Cambio y evidencia | Comprobación / Estado |
| :--- | :--- | :--- |
| **R-01**: "Se distinguen controladores, servicios, entidades y repositorios. El dominio también contiene la definición de persistencia TypeORM, por lo que mezcla ambas responsabilidades en las mismas clases." | Se reestructuró el proyecto separando entidades de persistencia en src/schemas/entities/, agregando capa de src/mappers/ y conectando repositorios propios en src/repositories/. Se ajustó src/data-source.ts y el script de seed en package.json. *(Commits: ef4ace0, ee34e3f)*. | Compilación limpia (
pm run build), ejecución de migraciones y carga exitosa con 
pm run seed. **Resuelta**. |
| **R-02**: "Falta evidencia entregada de persistencia tras reinicio." | Se incorpora flujo documentado y verificable de creación de registros, reinicio de servidor/contenedor con volumen persistente y consulta posterior sin re-ejecutar el seeder. *(Archivos: README.md, compose.yaml, docs/evidencias/)*. | Prueba de reinicio en entorno local y en Kuberos UCT conservando los datos almacenados. **En progreso**. |
| **R-03**: "Además, la prueba E2E incluida espera una ruta raíz que responde 404." | Se reemplazará la prueba E2E por defecto de NestJS por los 3 escenarios E2E reales exigidos (acceso/negocio, recuperación de contraseña y permisos diferenciados) sobre una base de datos de prueba aislada. *(Archivos: 	ests/e2e/)*. | Ejecución automatizada en pipeline CI/CD con cobertura >= 85%. **En progreso**. |
