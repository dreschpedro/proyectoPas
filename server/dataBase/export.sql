INSERT INTO "cliente" ("id_cliente", "apellido", "nombre", "dni", "fechaNacimiento", "genero", "email", "contacto", "telefono", "departamento", "localidad", "domicilio", "ocupacion", "activo", "createdAt", "updatedAt") VALUES
	(1, 'Rodriguez', 'Ramon', '1234343', '1973-02-21', 'masculino', 'ramon@gmail.com', '21212121', '323323232', '54028', '54028030000', 'Av San Martin 213', 'albañil', 'true', '2023-09-12 10:24:10.782-03', '2023-09-12 10:24:10.782-03'),
	(2, 'epinola', 'gabriela', '83873832', '1993-12-01', 'femenino', 'gabriela@gmail.com', '3434988984', '1212123232', '54028', '54028010000', 'av san justo 213', 'maestra', 'true', '2023-09-12 10:27:01.61-03', '2023-09-12 10:27:01.61-03'),
	(3, 'gomez', 'jaqueline', '7872328', '1999-07-15', 'femenino', 'jaqueline@gmail.com', '72763763', '32721980', '54042', '54042070000', 'av guacurari 213', 'pediatra', 'true', '2023-09-12 10:30:46.721-03', '2023-09-12 10:30:46.721-03');


INSERT INTO "organizacion" ("id_organizacion", "nombre", "direccion", "telefono", "email", "descripcion", "imagen", "activo", "createdAt", "updatedAt") VALUES
	(1, 'Organización Ejemplo 1', '123 Calle Principal', '+1234567890', 'ejemplo1@example.com', 'Esta es una organización de ejemplo número 1.', '/uploads/organizacion/default_organizacion.png', 'true', '2023-09-12 08:43:07.593-03', '2023-09-12 08:43:07.593-03'),
	(2, 'Organización Ejemplo 2', 'Calle Principal 234', '3223567890', 'ejemplo2@example.com', 'Esta es una organización de ejemplo número 2', '/uploads/organizacion/default_organizacion.png', 'true', '2023-09-12 08:43:51.709-03', '2023-09-12 08:43:51.709-03'),
	(3, 'estelar Moon', 'Calle Rivadavia 234', '3223567890', 'star@example.com', 'Esta es una organización de ejemplo número 3', '/uploads/organizacion/default_organizacion.png', 'true', '2023-09-12 08:47:08.988-03', '2023-09-12 08:47:08.988-03');


INSERT INTO "usuario" ("id_usuario", "username", "password", "email", "token", "confirmado", "rol", "activo", "createdAt", "updatedAt") VALUES
	(2, 'ramon', '$2b$10$f7c6TFSwny0xvIOhiTIj0eCJHOcisx8lYElsR7eNMXFLmFktS1E7q', 'ramon@data', '0.62700046751299681694520222030', 'false', 'data-entry', 'true', '2023-09-12 09:03:41.856-03', '2023-09-12 09:03:42.189-03'),
	(3, 'fernando', '$2b$10$RcgT/i7aJw9c/M/sigWJRecGc9Jco9mQLFWY2LiQAvT.mLLeQSdqa', 'fer@fideo', '', 'true', 'consultor', 'true', '2023-09-12 09:05:37.402-03', '2023-09-12 09:06:56.863-03'),
	(4, 'federico', '$2b$10$37LT.4tUh4NFRsIX2KPIou.7v8G/EKUudBxK0cF5aRS4mM0FRxU1.', 'fede@admin', '', 'true', 'data-entry', 'true', '2023-09-12 09:50:54.997-03', '2023-09-12 09:51:55.4-03'),
	(1, 'admin', '$2b$10$fTk.lt2DMBtnZYPM0Mxpuen9LtgeQtkX0BhVkxNYZs53ubcj27Elu', 'admin@admin.com', '', 'true', 'admin', 'true', '2023-09-12 09:01:01.8-03', '2023-09-12 09:08:59.592-03');


INSERT INTO "personal" ("id_personal", "apellido", "nombre", "cuilt", "domicilio", "profesion", "telefono", "imagen", "activo", "createdAt", "updatedAt", "id_organizacion", "id_usuario") VALUES
	(1, 'Rodriguez', 'Estela', '726372367', 'Calle Ejemplo 123', 'Pediatra', '3223567890', '/uploads/personal/default_personal.png', 'true', '2023-09-12 09:19:11.277-03', '2023-09-12 09:19:11.277-03', 1, 1),
	(2, 'Esquivel', 'Ramon', '6767632', 'Av Ejemplo 8998', 'Administrativo', '12123223', '/uploads/personal/default_personal.png', 'true', '2023-09-12 09:21:27.116-03', '2023-09-12 09:21:27.116-03', 2, 2),
	(3, 'Pastini', 'Fernando', '213243443', 'Av Chocolate 535', 'Abogado', '6276327632', '/uploads/personal/default_personal.png', 'true', '2023-09-12 09:23:04.743-03', '2023-09-12 09:23:04.743-03', 3, 3);


INSERT INTO "producto" ("id_producto", "nombre", "descripcion", "activo", "createdAt", "updatedAt", "id_organizacion") VALUES
	(9, 'acta nacimiento', 'descripcion producto', 'true', '2023-09-12 09:46:55.32-03', '2023-09-12 09:46:55.32-03', 2),
	(1, 'Aguja Esterilizada', 'descripcion producto', 'true', '2023-09-12 09:39:15.293-03', '2023-09-12 10:11:08.555-03', 1),
	(2, 'Guantes de Nitrilo', 'descripcion producto', 'true', '2023-09-12 09:39:42.398-03', '2023-09-12 10:11:40.199-03', 1),
	(3, 'Gotas para ojos', 'descripcion producto', 'true', '2023-09-12 09:40:18.802-03', '2023-09-12 10:11:42.598-03', 1),
	(4, 'dni nuevo', 'descripcion producto', 'true', '2023-09-12 09:40:51.003-03', '2023-09-12 10:11:44.407-03', 2),
	(5, 'pasaporte nuevo', 'descripcion producto', 'true', '2023-09-12 09:41:06.171-03', '2023-09-12 10:11:45.946-03', 2),
	(6, 'vacuna covid', 'descripcion producto', 'true', '2023-09-12 09:42:08.486-03', '2023-09-12 10:11:47.55-03', 3),
	(7, 'sesion psicologia', 'descripcion producto', 'true', '2023-09-12 09:42:23.993-03', '2023-09-12 10:11:49.296-03', 3),
	(8, 'estudio de sangre', 'descripcion producto', 'true', '2023-09-12 09:42:37.261-03', '2023-09-12 10:11:51.594-03', 3);


INSERT INTO "servicio" ("id_servicio", "nombre", "descripcion", "activo", "createdAt", "updatedAt", "id_organizacion") VALUES
	(1, 'pediatria', 'descripcion servicio', 'true', '2023-09-12 09:31:14.869-03', '2023-09-12 09:31:14.869-03', 1),
	(2, 'oftamologia', 'descripcion servicio', 'true', '2023-09-12 09:31:34.653-03', '2023-09-12 09:31:34.653-03', 1),
	(3, 'clinica general', 'descripcion servicio', 'true', '2023-09-12 09:31:58.842-03', '2023-09-12 09:31:58.842-03', 1),
	(4, 'registro dni', 'descripcion servicio', 'true', '2023-09-12 09:32:42.673-03', '2023-09-12 09:32:42.673-03', 2),
	(5, 'registro pasaporte', 'descripcion servicio', 'true', '2023-09-12 09:32:50.226-03', '2023-09-12 09:32:50.226-03', 2),
	(6, 'matrimonio', 'descripcion servicio', 'true', '2023-09-12 09:32:57.759-03', '2023-09-12 09:32:57.759-03', 2),
	(7, 'psicologia', 'descripcion servicio', 'true', '2023-09-12 09:35:01.744-03', '2023-09-12 09:35:01.744-03', 3),
	(8, 'bioquimica', 'descripcion servicio', 'true', '2023-09-12 09:35:19.269-03', '2023-09-12 09:35:19.269-03', 3),
	(9, 'vacunacion', 'descripcion servicio', 'true', '2023-09-12 09:35:40.136-03', '2023-09-12 09:35:40.136-03', 3);


INSERT INTO "serv_realizado" ("id_serv_realizado", "createdAt", "updatedAt", "id_servicio", "id_cliente", "id_usuario") VALUES
	(1, '2023-09-12 11:03:42.683-03', '2023-09-12 11:03:42.683-03', 1, 1, 1),
	(2, '2023-09-12 11:13:59.167-03', '2023-09-12 11:13:59.167-03', 2, 1, 1),
	(3, '2023-09-12 11:14:24.723-03', '2023-09-12 11:14:24.723-03', 2, 2, 1),
	(4, '2023-09-12 11:14:28.803-03', '2023-09-12 11:14:28.803-03', 1, 2, 1),
	(5, '2023-09-12 11:14:46.826-03', '2023-09-12 11:14:46.826-03', 1, 1, 3),
	(6, '2023-09-12 11:14:57.897-03', '2023-09-12 11:14:57.897-03', 3, 1, 3),
	(7, '2023-09-12 11:20:31.046-03', '2023-09-12 11:20:31.046-03', 4, 1, 3);


INSERT INTO "prod_entreg" ("id_prod_entreg", "entregado", "fecha_entrega", "createdAt", "updatedAt", "id_serv_realizado", "id_producto") VALUES
	(1, 'false', '2023-09-11', '2023-09-12 13:44:55.121-03', '2023-09-12 13:44:55.121-03', 1, 9),
	(2, 'true', '2023-08-11', '2023-09-12 13:45:26.426-03', '2023-09-12 13:45:26.426-03', 2, 7),
	(3, 'false', '2023-08-11', '2023-09-12 13:45:58.966-03', '2023-09-12 13:45:58.966-03', 3, 7),
	(4, 'false', '2023-09-01', '2023-09-12 13:46:30.196-03', '2023-09-12 13:46:30.196-03', 4, 3);
