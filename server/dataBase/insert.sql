-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         PostgreSQL 15.2, compiled by Visual C++ build 1914, 64-bit
-- SO del servidor:              
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando datos para la tabla public.cliente: 2 rows
/*!40000 ALTER TABLE "cliente" DISABLE KEYS */;
INSERT INTO "cliente" ("id_cliente", "apellido", "nombre", "dni", "fechaNacimiento", "genero", "email", "contacto", "telefono", "provincia", "departamento", "localidad", "domicilio", "ocupacion", "activo", "createdAt", "updatedAt") VALUES
	(4, 'Perez', 'Juana', '5555', '1965-02-14', 'femenino', 'cjsdbh@nkdfjvn.com', '65165165', '651651651', '54', '54028', '54028030000', 'dvfdf 651651', 'Docente', 'true', '2023-08-21 18:48:10.821-03', '2023-08-21 18:48:10.821-03'),
	(3, 'Pablo', 'Rodriguez', '4444', '2005-05-24', 'masculino', 'cjsdbh@nkdfjvn.com', '65165165', '651651651', '54', '54028', '54028010000', 'dvfdf 651651', 'Docente', 'true', '2023-08-21 18:47:47.924-03', '2023-08-21 18:47:47.924-03');
/*!40000 ALTER TABLE "cliente" ENABLE KEYS */;

-- Volcando datos para la tabla public.organizacion: -1 rows
/*!40000 ALTER TABLE "organizacion" DISABLE KEYS */;
INSERT INTO "organizacion" ("id_organizacion", "nombre", "direccion", "telefono", "email", "descripcion", "imagen", "activo", "createdAt", "updatedAt") VALUES
	(1, 'Sanatorio Caminos', 'Av San Martin 3213', '123456789', 'caminos@sanatorio.com.ar', 'csdcsdc', '/uploads/organizacion/default_organizacion.png', 'true', '2023-08-02 21:22:08.114-03', '2023-08-02 21:22:08.114-03'),
	(2, 'Universidad Nacional', 'Avenida Universidad 123', '555-123-4567', 'contacto@universidadnacional.edu', 'jkjkjkjkc', '/uploads/organizacion/default_organizacion.png', 'true', '2023-08-02 21:22:16.815-03', '2023-08-02 21:22:16.815-03'),
	(3, 'Organización sin fines de lucro', 'Plaza de la Solidaridad 789', '555-555-5555', 'fines@organizacion.org', 'jkjkjkjkc', '/uploads/organizacion/default_organizacion.png', 'true', '2023-08-02 21:22:30.354-03', '2023-08-02 21:22:30.354-03'),
	(4, 'jjjjjjjj', 'av org 1', '3216816516', 'csd@fd', 'cdsc', '/uploads/organizacion/default_organizacion.png', 'true', '2023-08-08 18:44:42.206-03', '2023-08-08 18:44:42.206-03'),
	(5, 'Juancsdcsdcsdc', 'San Martín 2256', '1111111111', 'perez1@juan.com', 'xaaaaaaaa', '/uploads/organizacion/default_organizacion.png', 'true', '2023-08-08 18:49:30.126-03', '2023-08-08 18:49:30.126-03'),
	(6, 'Sanatorio Boratti', 'San Martín 2256', '3216816516', 'boratti@sanatorio.com.ar', 'dccccc', '/uploads/organizacion/default_organizacion.png', 'true', '2023-08-08 18:50:37.915-03', '2023-08-08 18:50:37.915-03');
/*!40000 ALTER TABLE "organizacion" ENABLE KEYS */;

-- Volcando datos para la tabla public.personal: -1 rows
/*!40000 ALTER TABLE "personal" DISABLE KEYS */;
INSERT INTO "personal" ("id_personal", "apellido", "nombre", "cuilt", "domicilio", "profesion", "telefono", "imagen", "activo", "createdAt", "updatedAt", "id_organizacion", "id_usuario") VALUES
	(2, 'Gonzalez', 'Ramon', '222222222', 'Posadas', 'Profesion 2', '8888888', '/uploads/personal/default_personal.png', 'true', '2023-08-02 21:25:12.903-03', '2023-08-03 14:19:51.075-03', 1, 2),
	(1, 'Perez', 'Juancsdcsdcsdc', '111111111', 'Posadascdcd', 'Profesion 1', '1111111111', '/uploads/personal/default_personal.png', 'true', '2023-08-02 21:25:04.971-03', '2023-08-03 14:20:12.701-03', 1, 1),
	(3, 'Espinosa', 'Federico', '999999', 'Posadas', 'Profesion 3', '3333333333', '/uploads/personal/default_personal.png', 'true', '2023-08-02 21:25:18.566-03', '2023-08-03 14:21:18.054-03', 2, 3);
/*!40000 ALTER TABLE "personal" ENABLE KEYS */;

-- Volcando datos para la tabla public.producto: -1 rows
/*!40000 ALTER TABLE "producto" DISABLE KEYS */;
/*!40000 ALTER TABLE "producto" ENABLE KEYS */;

-- Volcando datos para la tabla public.prod_entreg: -1 rows
/*!40000 ALTER TABLE "prod_entreg" DISABLE KEYS */;
/*!40000 ALTER TABLE "prod_entreg" ENABLE KEYS */;

-- Volcando datos para la tabla public.servicio: -1 rows
/*!40000 ALTER TABLE "servicio" DISABLE KEYS */;
INSERT INTO "servicio" ("id_servicio", "nombre", "descripcion", "activo", "createdAt", "updatedAt", "id_organizacion") VALUES
	(1, 'servicio 1', 'descripcion', 'true', '2023-08-09 21:40:41.855-03', '2023-08-09 21:40:41.855-03', 1),
	(2, 'servicio 2', 'descripcion 2', 'true', '2023-08-09 21:40:58.941-03', '2023-08-09 21:40:58.941-03', 2),
	(3, 'servicio 3', 'descripcion 3', 'true', '2023-08-09 21:41:08.238-03', '2023-08-09 21:41:08.238-03', 3);
/*!40000 ALTER TABLE "servicio" ENABLE KEYS */;

-- Volcando datos para la tabla public.serv_realizado: -1 rows
/*!40000 ALTER TABLE "serv_realizado" DISABLE KEYS */;
/*!40000 ALTER TABLE "serv_realizado" ENABLE KEYS */;

-- Volcando datos para la tabla public.usuario: -1 rows
/*!40000 ALTER TABLE "usuario" DISABLE KEYS */;
INSERT INTO "usuario" ("id_usuario", "username", "password", "email", "token", "confirmado", "rol", "activo", "createdAt", "updatedAt") VALUES
	(1, 'Juan1', '$2b$10$jodfEF8kEPjhmSbgyvZ3Q.toK/kAqgdU7/P7Z5eXIG.MixgjbQSKW', 'perez1@juan.com', '0.54540856590168781691022238596', 'false', 'admin', 'true', '2023-08-02 21:23:58.53-03', '2023-08-02 21:23:58.659-03'),
	(2, 'Ramon2', '$2b$10$PUP.GxwbyUEHrEspluCOd.1RdkYOzxKOErW9kmnEsigBqyhjLrqlS', 'gonzalez@ramon.com', '0.96695835254248391691022248357', 'false', 'Data-Entry', 'true', '2023-08-02 21:24:08.278-03', '2023-08-02 21:24:08.433-03'),
	(3, 'Federico3', '$2b$10$t5S8waS87VsyjSH.I.gR2ubluR6bfc.zBSdtep7efv35svy6Qnsqi', 'fede@espino.com', '0.28504958233006161691022253920', 'false', 'Consultor', 'true', '2023-08-02 21:24:13.84-03', '2023-08-02 21:24:13.998-03');
/*!40000 ALTER TABLE "usuario" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
