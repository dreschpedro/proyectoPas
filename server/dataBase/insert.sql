-- INSERT INTO "usuario" ("id_usuario", "username", "password", "email", "token", "confirmado", "rol", "activo", "createdAt", "updatedAt") VALUES
-- 	(1, 'Juan1', '$2b$10$jodfEF8kEPjhmSbgyvZ3Q.toK/kAqgdU7/P7Z5eXIG.MixgjbQSKW', 'perez1@juan.com', '0.54540856590168781691022238596', 'false', 'admin', 'true', '2023-08-02 21:23:58.53-03', '2023-08-02 21:23:58.659-03'),
-- 	(2, 'Ramon2', '$2b$10$PUP.GxwbyUEHrEspluCOd.1RdkYOzxKOErW9kmnEsigBqyhjLrqlS', 'gonzalez@ramon.com', '0.96695835254248391691022248357', 'false', 'Data-Entry', 'true', '2023-08-02 21:24:08.278-03', '2023-08-02 21:24:08.433-03'),
-- 	(3, 'Federico3', '$2b$10$t5S8waS87VsyjSH.I.gR2ubluR6bfc.zBSdtep7efv35svy6Qnsqi', 'fede@espino.com', '0.28504958233006161691022253920', 'false', 'Consultor', 'true', '2023-08-02 21:24:13.84-03', '2023-08-02 21:24:13.998-03');
-- /*!40000 ALTER TABLE "usuario" ENABLE KEYS */;


-- INSERT INTO "organizacion" ("id_organizacion", "nombre", "direccion", "telefono", "email", "descripcion", "imagen", "activo", "createdAt", "updatedAt") VALUES
-- 	(1, 'Sanatorio Caminos', 'Av San Martin 3213', '123456789', 'caminos@sanatorio.com.ar', 'csdcsdc', '/uploads/organizacion/default_organizacion.png', 'true', '2023-08-02 21:22:08.114-03', '2023-08-02 21:22:08.114-03'),
-- 	(2, 'Universidad Nacional', 'Avenida Universidad 123', '555-123-4567', 'contacto@universidadnacional.edu', 'jkjkjkjkc', '/uploads/organizacion/default_organizacion.png', 'true', '2023-08-02 21:22:16.815-03', '2023-08-02 21:22:16.815-03'),
-- 	(3, 'Organización sin fines de lucro', 'Plaza de la Solidaridad 789', '555-555-5555', 'fines@organizacion.org', 'jkjkjkjkc', '/uploads/organizacion/default_organizacion.png', 'true', '2023-08-02 21:22:30.354-03', '2023-08-02 21:22:30.354-03'),
-- 	(4, 'jjjjjjjj', 'av org 1', '3216816516', 'csd@fd', 'cdsc', '/uploads/organizacion/default_organizacion.png', 'true', '2023-08-08 18:44:42.206-03', '2023-08-08 18:44:42.206-03'),
-- 	(5, 'Juancsdcsdcsdc', 'San Martín 2256', '1111111111', 'perez1@juan.com', 'xaaaaaaaa', '/uploads/organizacion/default_organizacion.png', 'true', '2023-08-08 18:49:30.126-03', '2023-08-08 18:49:30.126-03'),
-- 	(6, 'Sanatorio Boratti', 'San Martín 2256', '3216816516', 'boratti@sanatorio.com.ar', 'dccccc', '/uploads/organizacion/default_organizacion.png', 'true', '2023-08-08 18:50:37.915-03', '2023-08-08 18:50:37.915-03');	
 

-- INSERT INTO "personal" ("id_personal", "apellido", "nombre", "cuilt", "domicilio", "profesion", "telefono", "imagen", "activo", "createdAt", "updatedAt", "id_organizacion", "id_usuario") VALUES
-- 	(2, 'Gonzalez', 'Ramon', '222222222', 'Posadas', 'Profesion 2', '8888888', '/uploads/personal/default_personal.png', 'true', '2023-08-02 21:25:12.903-03', '2023-08-03 14:19:51.075-03', 1, 2),
-- 	(1, 'Perez', 'Juancsdcsdcsdc', '111111111', 'Posadascdcd', 'Profesion 1', '1111111111', '/uploads/personal/default_personal.png', 'true', '2023-08-02 21:25:04.971-03', '2023-08-03 14:20:12.701-03', 1, 1),
-- 	(3, 'Espinosa', 'Federico', '999999', 'Posadas', 'Profesion 3', '3333333333', '/uploads/personal/default_personal.png', 'true', '2023-08-02 21:25:18.566-03', '2023-08-03 14:21:18.054-03', 2, 3);

-- INSERT INTO "servicio" ("id_servicio", "nombre", "descripcion", "activo", "createdAt", "updatedAt", "id_organizacion") VALUES
-- 	(1, 'servicio 1', 'descripcion', 'true', '2023-08-09 21:40:41.855-03', '2023-08-09 21:40:41.855-03', 1),
-- 	(2, 'servicio 2', 'descripcion 2', 'true', '2023-08-09 21:40:58.941-03', '2023-08-09 21:40:58.941-03', 2),
-- 	(3, 'servicio 3', 'descripcion 3', 'true', '2023-08-09 21:41:08.238-03', '2023-08-09 21:41:08.238-03', 3);

INSERT INTO "cliente" ("id_cliente", "apellido", "nombre", "dni", "fechaNacimiento", "genero", "email", "contacto", "telefono", "provincia", "departamento", "localidad", "domicilio", "ocupacion", "activo", "createdAt", "updatedAt") VALUES
	(3, 'Perez', 'Juana', 321351, '1965-02-14 21:00:00-03', 'Femenino', 'cjsdbh@nkdfjvn.com', '65165165', '651651651', 54, 54028, 54028030000, 'dvfdf 651651', 'Docente', 'true', '2023-08-21 18:47:47.924-03', '2023-08-21 18:47:47.924-03'),
	(4, 'Perez', 'Juana', 321352, '1965-02-14 21:00:00-03', 'Femenino', 'cjsdbh@nkdfjvn.com', '65165165', '651651651', 54, 54028, 54028030000, 'dvfdf 651651', 'Docente', 'true', '2023-08-21 18:48:10.821-03', '2023-08-21 18:48:10.821-03');