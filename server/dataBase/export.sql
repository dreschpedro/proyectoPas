
INSERT INTO "cliente" ("id_cliente", "apellido", "nombre", "dni", "fechaNacimiento", "genero", "email", "contacto", "telefono", "departamento", "localidad", "domicilio", "ocupacion", "activo", "createdAt", "updatedAt") VALUES
	(1, 'Rodriguez', 'Ramon', '1234343', '1973-02-21', 'masculino', 'ramon@gmail.com', '21212121', '323323232', '54028', '54028030000', 'Av San Martin 213', 'albañil', 'true', '2023-09-12 10:24:10.782-03', '2023-09-12 10:24:10.782-03'),
	(2, 'epinola', 'gabriela', '83873832', '1993-12-01', 'femenino', 'gabriela@gmail.com', '3434988984', '1212123232', '54028', '54028010000', 'av san justo 213', 'maestra', 'true', '2023-09-12 10:27:01.61-03', '2023-09-12 10:27:01.61-03'),
	(3, 'gomez', 'jaqueline', '7872328', '1999-07-15', 'femenino', 'jaqueline@gmail.com', '72763763', '32721980', '54042', '54042070000', 'av guacurari 213', 'pediatra', 'true', '2023-09-12 10:30:46.721-03', '2023-09-12 10:30:46.721-03');	

INSERT INTO "organizacion" ("id_organizacion", "nombre", "direccion", "telefono", "email", "descripcion", "imagen", "activo", "createdAt", "updatedAt") VALUES
	(2, 'Sanatorio Canino', 'Calle Caminos 234', '21651651', 'sanatorio@canino.com', 'Vaterinaria de canes', '/uploads/organizacion/default_organizacion.png', 'true', '2023-09-15 10:12:36.723-03', '2023-09-15 10:12:36.723-03'),
	(7, 'instituto posadas', 'av san martin 234', '21651651', 'instituto@posadas.com', 'vaterinaria de canes', '/uploads/organizacion/default_organizacion.png', 'true', '2023-09-15 10:25:37.482-03', '2023-09-15 10:25:37.482-03'),
	(8, 'instituto posadas', 'av san martin 234', '21651651', 'instituto@cosa.com', 'vaterinaria de canes', '/uploads/organizacion/default_organizacion.png', 'true', '2023-09-15 10:27:36.996-03', '2023-09-15 10:27:36.996-03'),
	(9, 'pas', 'Calle asistencia 234', '3223567890', 'pas@programa.com', 'Este es el PAS', '/uploads/organizacion/default_organizacion.png', 'true', '2023-09-18 09:27:50.271-03', '2023-09-18 09:27:50.271-03'),
	(10, 'vicegobernacion', 'Calle vicegobernacion 234', '3223567890', 'vicegobernacion@ministerio.com', 'ministerio de vicegobernacion', '/uploads/organizacion/default_organizacion.png', 'true', '2023-09-18 09:28:31.094-03', '2023-09-18 09:28:31.094-03');

INSERT INTO "personal" ("id_personal", "apellido", "nombre", "cuilt", "domicilio", "profesion", "telefono", "imagen", "activo", "createdAt", "updatedAt", "id_organizacion", "id_usuario") VALUES
	(1, 'Rodriguez', 'Estela', '726372367', 'Calle Ejemplo 123', 'Pediatra', '3223567890', '/uploads/personal/default_personal.png', 'true', '2023-09-12 09:19:11.277-03', '2023-09-12 09:19:11.277-03', 2, 1),
	(3, 'Pastini', 'Fernando', '213243443', 'Av Chocolate 535', 'Abogado', '6276327632', '/uploads/personal/default_personal.png', 'true', '2023-09-12 09:23:04.743-03', '2023-09-12 09:23:04.743-03', 2, 3),
	(2, 'Esquivel', 'Ramon', '6767632', 'Av Ejemplo 8998', 'Administrativo', '12123223', '/uploads/personal/default_personal.png', 'true', '2023-09-12 09:21:27.116-03', '2023-09-12 09:21:27.116-03', 2, 2),
	(4, 'vicegob', 'vicegob', '2132437777', 'Av ministerio 535', 'vicegob', '16516515632', '/uploads/personal/default_personal.png', 'true', '2023-09-18 10:04:29.734-03', '2023-09-18 10:04:29.734-03', 10, 5);

INSERT INTO "producto" ("id_producto", "nombre", "descripcion", "activo", "createdAt", "updatedAt", "id_organizacion", "stock") VALUES
	(1, 'Aguja Esterilizada', 'detalle producto', 'true', '2023-09-12 09:39:15.293-03', '2023-09-12 10:11:08.555-03', 2, 0),
	(6, 'vacuna covid', 'detalle producto', 'true', '2023-09-12 09:42:08.486-03', '2023-09-12 10:11:47.55-03', 2, 0),
	(7, 'sesion psicologia', 'detalle producto', 'true', '2023-09-12 09:42:23.993-03', '2023-09-12 10:11:49.296-03', 2, 0),
	(9, 'acta nacimiento', 'detalle producto', 'true', '2023-09-12 09:46:55.32-03', '2023-09-12 09:46:55.32-03', 2, 0),
	(5, 'pasaporte nuevo', 'detalle producto', 'true', '2023-09-12 09:41:06.171-03', '2023-09-12 10:11:45.946-03', 2, 0),
	(3, 'Gotas para ojos', 'detalle producto', 'true', '2023-09-12 09:40:18.802-03', '2023-09-12 10:11:42.598-03', 7, 0),
	(8, 'estudio de sangre', 'detalle producto', 'true', '2023-09-12 09:42:37.261-03', '2023-09-12 10:11:51.594-03', 7, 0),
	(4, 'dni nuevo', 'detalle producto', 'true', '2023-09-12 09:40:51.003-03', '2023-09-12 10:11:44.407-03', 8, 0),
	(2, 'Guantes de Nitrilo', 'detalle producto', 'false', '2023-09-12 09:39:42.398-03', '2023-09-15 11:18:53.646-03', 2, 0),
	(10, 'lente', NULL, 'true', '2023-09-18 09:50:32.789-03', '2023-09-18 09:50:32.789-03', 10, 0),
	(11, 'comida', NULL, 'true', '2023-09-18 09:50:54.709-03', '2023-09-18 09:50:54.709-03', 10, 0),
	(12, 'papeles', NULL, 'true', '2023-09-18 09:51:29.181-03', '2023-09-18 09:51:29.181-03', 10, 0);

INSERT INTO "prod_entreg" ("id_prod_entreg", "entregado", "fecha_entrega", "createdAt", "updatedAt", "id_serv_realizado", "id_producto") VALUES
	(1, 'false', '2023-09-01', '2023-09-15 11:36:28.577-03', '2023-09-15 11:36:28.577-03', 4, 3),
	(2, 'false', '2023-08-11', '2023-09-15 11:42:01.544-03', '2023-09-15 11:42:01.544-03', 3, 7),
	(3, 'true', '2023-08-11', '2023-09-15 11:42:10.364-03', '2023-09-15 11:42:10.364-03', 2, 7),
	(4, 'false', '2023-09-11', '2023-09-15 11:42:21.393-03', '2023-09-15 11:42:21.393-03', 1, 9);

INSERT INTO "servicio" ("id_servicio", "nombre", "descripcion", "activo", "createdAt", "updatedAt", "id_organizacion") VALUES
	(1, 'pediatria', 'descripcion servicio', 'true', '2023-09-12 09:31:14.869-03', '2023-09-12 09:31:14.869-03', 2),
	(2, 'oftamologia', 'descripcion servicio', 'true', '2023-09-12 09:31:34.653-03', '2023-09-12 09:31:34.653-03', 2),
	(7, 'psicologia', 'descripcion servicio', 'true', '2023-09-12 09:35:01.744-03', '2023-09-12 09:35:01.744-03', 2),
	(4, 'registro dni', 'descripcion servicio', 'true', '2023-09-12 09:32:42.673-03', '2023-09-12 09:32:42.673-03', 2),
	(6, 'matrimonio', 'descripcion servicio', 'true', '2023-09-12 09:32:57.759-03', '2023-09-12 09:32:57.759-03', 2),
	(3, 'clinica general', 'descripcion servicio', 'true', '2023-09-12 09:31:58.842-03', '2023-09-12 09:31:58.842-03', 8),
	(8, 'bioquimica', 'descripcion servicio', 'true', '2023-09-12 09:35:19.269-03', '2023-09-12 09:35:19.269-03', 7),
	(9, 'vacunacion', 'descripcion servicio', 'true', '2023-09-12 09:35:40.136-03', '2023-09-12 09:35:40.136-03', 7),
	(5, 'registro pasaporte', 'descripcion servicio', 'true', '2023-09-12 09:32:50.226-03', '2023-09-12 09:32:50.226-03', 8),
	(10, 'trabajo social', 'social work', 'true', '2023-09-18 09:31:23.168-03', '2023-09-18 09:31:23.168-03', 10),
	(11, 'papeles', 'letters', 'true', '2023-09-18 09:31:37.468-03', '2023-09-18 09:31:37.468-03', 10),
	(12, 'tramites', 'jobs', 'true', '2023-09-18 09:31:51.902-03', '2023-09-18 09:31:51.902-03', 10);

INSERT INTO "serv_realizado" ("id_serv_realizado", "ubicacion", "createdAt", "updatedAt", "id_servicio", "id_cliente", "id_usuario") VALUES
	(1, 'posadas', '2023-09-15 08:46:20.718-03', '2023-09-15 08:46:20.718-03', 1, 1, 1),
	(2, 'posadas', '2023-09-15 08:46:52.454-03', '2023-09-15 08:46:52.454-03', 2, 1, 1),
	(3, 'posadas', '2023-09-15 08:47:13.248-03', '2023-09-15 08:47:13.248-03', 4, 1, 3),
	(4, 'posadas', '2023-09-15 08:50:39.756-03', '2023-09-15 08:50:39.756-03', 5, 2, 1);

INSERT INTO "usuario" ("id_usuario", "username", "password", "email", "rol", "token", "confirmado", "activo", "createdAt", "updatedAt") VALUES
	(2, 'ramon', '$2b$10$f7c6TFSwny0xvIOhiTIj0eCJHOcisx8lYElsR7eNMXFLmFktS1E7q', 'ramon@data', 'data-entry', '0.62700046751299681694520222030', 'false', 'true', '2023-09-12 09:03:41.856-03', '2023-09-12 09:03:42.189-03'),
	(3, 'fernando', '$2b$10$RcgT/i7aJw9c/M/sigWJRecGc9Jco9mQLFWY2LiQAvT.mLLeQSdqa', 'fer@fideo', 'consultor', '', 'true', 'true', '2023-09-12 09:05:37.402-03', '2023-09-12 09:06:56.863-03'),
	(4, 'federico', '$2b$10$37LT.4tUh4NFRsIX2KPIou.7v8G/EKUudBxK0cF5aRS4mM0FRxU1.', 'fede@admin', 'data-entry', '', 'true', 'true', '2023-09-12 09:50:54.997-03', '2023-09-12 09:51:55.4-03'),
	(1, 'admin', '$2b$10$fTk.lt2DMBtnZYPM0Mxpuen9LtgeQtkX0BhVkxNYZs53ubcj27Elu', 'admin@admin.com', 'admin', '', 'true', 'true', '2023-09-12 09:01:01.8-03', '2023-09-12 09:08:59.592-03'),
	(5, 'vicegob', '$2b$10$eEQefu0dVYWZ4xAzZD6pc.nQKZNqQU3Nyy/Wh3Kxb2jTjJlu5Vs6q', 'vicegob@admin.com', 'admin', '0.42134875694560671695042156236', 'false', 'true', '2023-09-18 10:02:36.04-03', '2023-09-18 10:02:36.397-03');