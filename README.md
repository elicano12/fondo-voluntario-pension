# Proyecto de Gestión de Fondos - BTG Pactual

Este proyecto es una aplicación de gestión de fondos, que permite a los clientes suscribir y cancelar fondos de inversión y consultar el historial de transacciones. Está compuesto por un **backend** (API) construido con **Express / nodeJS** y un **frontend** desarrollado con **React**. Ambas aplicaciones comparten el mismo repositorio.

## Requisitos previos

Antes de empezar, asegúrate de tener instalados los siguientes programas en tu entorno:

- **Node.js** (versión 14.x o superior)
- **npm** como gestores de paquetes
- **MongoDB** como base de datos para el backend

## Configuración inicial

1. Clona el repositorio a tu máquina local:
   ```bash
   git clone https://github.com/elicano12/fondo-voluntario-pension.git

2. Ingresar al proyecto:
    ```bash 
        cd fondo-voluntario-pension

## Instalacion de dependencias, variables de entorno y ejecución del proyecto

- **Backend (API)**

1. Ingresar al Api:
    ```bash 
        cd api
2. Instalar las dependencias:
    ```bash 
        npm install
3. En el directorio api, crea un archivo .env con las siguientes variables:
    ```bash 
        NODE_ENV="development"
        PORT=3001
        MONGO_URI=
        EMAIL_USER=
        EMAIL_PASS=
        TWILIO_SID=
        TWILIO_SID_SMS=
        TWILIO_TOKEN=
        TWILIO_TELEFONO=
4. Para iniciar el servidor del backend ejecuta el siguiente comando:
    ```bash 
        npm run start:dev


- **Frontend (Client)**
1. Ingresar al Cliente:
    ```bash 
        cd client
2. Instalar las dependencias:
    ```bash 
        npm install
 3. En el directorio client, crea un archivo .env con las siguientes variables:
    ```bash 
        REACT_APP_ENVIRONMENT="development"
        REACT_APP_API_URL="http://localhost:3001/api"
4. Para iniciar el servidor del frontend ejecuta el siguiente comando:
    ```bash 
        npm run start
Esto ejecutará el servidor de desarrollo de React, por defecto en el puerto 3000.

#### Acceso a la aplicación
El frontend estará disponible en http://localhost:3000.
El backend estará disponible en http://localhost:3001/api.

## Testing

- **Backend**
Para ejecutar las pruebas unitarias del backend, navega al directorio api y utiliza el siguiente comando:
    ```bash 
        npm run test

#### Contacto
Si tienes alguna duda o sugerencia, no dudes en ponerte en contacto conmigo: 
   - **email:**  ele.cano111@gmail.com 
   - **linkedIn:** https://www.linkedin.com/in/eli-cano/


#### Explicación:
- **Requisitos previos**: Lista de herramientas que el usuario necesita instalar antes de ejecutar el proyecto.
- **Configuración inicial**: Comandos para clonar el repositorio y moverse al directorio del proyecto.
- **Instalación de dependencias**: Se especifica cómo instalar las dependencias tanto para el backend como para el frontend.
- **Variables de entorno**: Especificación de las variables de entorno necesarias para que el backend y el frontend funcionen correctamente.
- **Ejecución del proyecto**: Instrucciones para ejecutar tanto el servidor backend como el frontend en sus respectivos puertos.
- **Pruebas**: Instrucciones para ejecutar las pruebas unitarias del backend.
- **Estructura del proyecto**: Una breve descripción de cómo está organizado el repositorio.
