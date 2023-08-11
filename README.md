# ProyectoPas

Bienvenido al repositorio del ProyectoPas. Este proyecto tiene como objetivo proporcionar una plataforma de registro de servicios y productos brindados a las personas que participan en los operativos del Programa de Asistencia Solidaria (PAS) en diversos barrios. El proyecto se centra en el seguimiento y registro de los datos de las personas atendidas, así como los servicios específicos proporcionados durante los operativos.

## Estructura del Directorio

A continuación, se presenta una descripción de las principales carpetas y su contenido:

- `client/`: Contiene la parte del cliente de la aplicación.
  - `app/`: Directorio con las rutas.
    - `estadisticas/`, `organizaciones/`, `servicios/`, `usuarios/`: Módulos de la aplicación.
    - `axiosConfig.js` Configuracion para establcer las peticiones HTTP
  - `components/`: Diferentes versiones del NavBar utilizado.

- `server/`: Contiene la parte del servidor de la aplicación.
  - `config/`: Configuración de la conexión del Back-End con la Base de Datos
  - `controllers/`: Controladores de las rutas de la API.
  - `helpers/`: Funciones auxiliares y utilidades. Generador de :id los usuarios; controlador para las imágenes y JWT para la generación del token de sesión y posterior confirmación de la cuenta.
  - `middleware/`: Middleware de Autenticación con jsonwebtoken (JWT)
  - `models/`: Definiciones de modelos de la base de datos.
  - `routes/`: Definiciones de rutas de la API.
  - `uploads/`: Directorio para archivos cargados hacia el Front-End, como ser las imagenes, de Organizaciones, de los Usuarios, etc.

## Requisitos

1. Tener intalado NodeJS, Nodemon en el la PC.
   Podes instalar NodeJS descargando el instador aquí
   ```git
    https://nodejs.org/es/download
   ```
2. Instalar Nodemon. El atributo `-g` indica que `Nodemon` se instalará de manera global en el Sistema, no solo en el proyecto en el que te encuentres posicionado.
   ```git
    npm i -g nodemon
   ```
3. Postgres IDE: recomiendo instalar  todos los paquetes de Postgres para que el Back-End y la Base de datos se conecten exitosamente. A continueción indicaré cuales son las dependencias de Postgres necesarias. Podes descargar el IDE podes acceder a este [enlace](https://www.enterprisedb.com/postgresql-tutorial-resources-training-2?uuid=b63d9058-0ab9-44f7-aef0-ec0e0e2414e5&campaignId=Product_Trial_PostgreSQL_14)
No recomiendo intalar la última versión de `PgAdmin`, ya que no funciona correctamente, en su lugar, la versión 6.21, podes descargarla en este [enlace](https://www.postgresql.org/ftp/pgadmin/pgadmin4/v6.21/windows/)

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona este repositorio: 
    ``` git
    git clone https://github.com/dreschpedro/proyectoPas.git
    ```
2. Navega a la carpeta del proyecto: 
    ```git
    cd proyectoPas
    ```
3. Entra a la Rama DEV
   ```git
    git switch dev
   ```
4. Instala las dependencias: 
    ```git
    cd client
    echo "###Dependencias front###"
    npm i

    echo""
    cd ../server
    echo "###Dependencias back###"
    npm i
    ```

## Uso

1. En el directorio `/server` ejecutar ...
    ```git
    npm start
    ```
2. Y en el directorio `/client` ...
    ```git
    npm run dev
    ```
3. Luego, en el navegador, ingresar a `localhost:3000`

---

¡Gracias por tu interés en el ProyectoPas! Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto.
