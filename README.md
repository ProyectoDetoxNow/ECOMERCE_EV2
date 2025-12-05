🚀 Detox Now – Plataforma Web & Microservicios
📖 Descripción General

Detox Now es una empresa chilena dedicada a la venta de ingredientes congelados y porcionados para la preparación de batidos saludables y desintoxicantes. Con presencia en Santiago, Concepción y Viña del Mar, busca transformar digitalmente su operación mediante una plataforma moderna basada en Next.js, microservicios, y PostgreSQL.

Este repositorio corresponde al desarrollo del ecosistema técnico, compuesto por:

🖥️ Frontend

Aplicación web desarrollada en React + Next.js.

Desplegada en Vercel:
👉 https://detoxnow.vercel.app/

⚙️ Backend

Arquitectura basada en microservicios desplegados en Railway, utilizando PostgreSQL en Neon DB.
Tablas principales:

usuarios

productos

pago

(y el módulo específico de carrito, descrito más abajo)

🛒 Microservicio de Carrito de Compras (Carrito Service)

Servicio encargado de gestionar la lógica del carrito, integrándose con los servicios de Usuarios e Inventario.

📂 Índice

Objetivo

Características

Arquitectura Completa

Tecnologías

Instalación y Ejecución

API del Carrito

Contribuir

🎯 Objetivo

Construir una plataforma moderna y escalable que permita:

Gestionar usuarios, productos y pagos.

Integrar un Carrito de Compras totalmente funcional.

Desplegar frontend y backend en servicios cloud serverless (Vercel + Railway + Neon DB).

Automatizar escalamiento horizontal mediante microservicios.

El microservicio de Carrito permite agregar productos, actualizar cantidades y consultar el estado del carrito, interactuando con los servicios de Usuarios e Inventario.

✨ Características
🖥️ Frontend (Next.js)

Generación híbrida (SSR/SSG)

UI modular con React

Integración con API de microservicios

Deploy automático en Vercel

⚙️ Backend

Microservicios independientes

Endpoints REST

Conexión centralizada a PostgreSQL (Neon DB)

Arquitectura preparada para escalar

🛒 Carrito Service

Creación y obtención de carritos por usuario

Agregar, actualizar o eliminar productos

Validación de stock mediante Inventario Service

Persistencia en PostgreSQL

Comunicación con OpenFeign

Desarrollado con Java 17 + Spring Boot

🏗️ Arquitectura Completa
Arquitectura general del proyecto
Frontend (Next.js - Vercel)
       │
       ▼
Backend (Microservicios – Railway)
       │
       ▼
Base de Datos (PostgreSQL – Neon DB)
       ├── usuarios
       ├── productos
       ├── pago
       └── carrito / items

Arquitectura de microservicios
+------------------+       +--------------------+       +---------------------+
|  Usuario Service | <---> |  Carrito Service   | <---> |  Inventario Service |
+------------------+       +--------------------+       +---------------------+
         ^                         ^                             ^
         |                         |                             |
      (Feign)                  (Feign)                      (PostgreSQL)

🛠️ Tecnologías
🖼️ Frontend

React 18

Next.js

Node.js

Vercel

⚙️ Backend

Java 17

Spring Boot

Spring Web / Spring Data JPA / Spring Cloud OpenFeign

Maven

Railway (deploy)

🗄️ Base de datos

PostgreSQL

Neon DB (serverless)

⚙️ Instalación y Ejecución
🖥️ Frontend (Next.js)
git clone https://github.com/ProyectoDetoxNow/ECOMERCE_EV2
cd frontend
npm install
npm run dev

⚙️ Backend – Carrito Service

Clonar repositorio:

git clone https://github.com/ProyectoDetoxNow/DetoxEV2.git
cd DetoxEV2/Api_...


Configurar variables de entorno:

DB_URL=jdbc:postgresql://<neon-url>:5432/DetoxNow?sslmode=require
DB_USER=<usuario>
DB_PASS=<password>
SERVER_PORT=8082


Referenciarlas en application.properties:

spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASS}
server.port=${SERVER_PORT}


Ejecutar:

mvn clean install
mvn spring-boot:run

📡 API del Carrito
Método	Ruta	Descripción
GET	/api/carrito/{usuarioId}	Obtener el carrito de un usuario
POST	/api/carrito/{usuarioId}/agregar	Agregar un producto (params: productoId, cantidad)
PUT	/api/carrito/{usuarioId}/item/{itemId}	Actualizar la cantidad de un ítem
DELETE	/api/carrito/{usuarioId}/item/{itemId}	Eliminar un ítem del carrito
🤝 Contribuir

Las contribuciones son bienvenidas.
Puedes abrir un issue o un pull request para proponer mejoras o agregar funcionalidades.
