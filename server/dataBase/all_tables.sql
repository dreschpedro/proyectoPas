CREATE TABLE institucion (
  id_institucion SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  encargado VARCHAR(100) NOT NULL
);

-- Crear tabla info_socambient
CREATE TABLE info_socambient (
  id_info_socambient INTEGER PRIMARY KEY,
  nivel_escAct VARCHAR(50) NOT NULL,
  grado_escAct VARCHAR(50) NOT NULL,
  integrantes_casa INTEGER NOT NULL
);

-- Crear tabla operativo
CREATE TABLE operativo (
  id_operativo INTEGER PRIMARY KEY,
  calle VARCHAR(100) NOT NULL,
  altura_calle VARCHAR(20) NOT NULL,
  barrio VARCHAR(100) NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL
);

-- Crear tabla producto
CREATE TABLE producto (
  id_producto INTEGER PRIMARY KEY,
  nombre_prod VARCHAR(100) NOT NULL,
  precio NUMERIC(10, 2) NOT NULL,
  entregado BOOLEAN NOT NULL,
  fecha_entrega DATE
);

-- Crear tabla usuario
CREATE TABLE usuario (
  id_usuario INTEGER PRIMARY KEY,
  usuario VARCHAR(50) NOT NULL,
  pass VARCHAR(100) NOT NULL,
  rol VARCHAR(20) NOT NULL,
  token_sesion VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  confirmado BOOLEAN NOT NULL
);

-- Crear tabla personal
CREATE TABLE personal (
  id_personal INTEGER PRIMARY KEY,
  apellido VARCHAR(100) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  cuilt VARCHAR(20) NOT NULL,
  profesion VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  id_institucion INTEGER REFERENCES institucion(id_institucion),
  id_usuario INTEGER REFERENCES usuario(id_usuario)
);

-- Crear tabla servicio
CREATE TABLE servicio (
  id_servicio INTEGER PRIMARY KEY,
  nombre_serv VARCHAR(100) NOT NULL,
  descripcion TEXT,
  id_institucion INTEGER REFERENCES institucion(id_institucion)
);

-- Crear tabla usuario_externo
CREATE TABLE usuario_externo (
  id_usuario_externo INTEGER PRIMARY KEY,
  apellido VARCHAR(100) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  cuilt VARCHAR(20) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  id_institucion INTEGER REFERENCES institucion(id_institucion),
  id_info_socambient INTEGER REFERENCES info_socambient(id_info_socambient)
);

-- Crear tabla serv_realizado
CREATE TABLE serv_realizado (
  id_serv_realizado INTEGER PRIMARY KEY,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  id_servicio INTEGER REFERENCES servicio(id_servicio),
  id_operativo INTEGER REFERENCES operativo(id_operativo),
  id_usuario_externo INTEGER REFERENCES usuario_externo(id_usuario_externo)
);

-- Crear tabla prod_entreg
CREATE TABLE prod_entreg (
  id_prod_entreg INTEGER PRIMARY KEY,
  id_serv_realizado INTEGER REFERENCES serv_realizado(id_serv_realizado),
  id_producto INTEGER REFERENCES producto(id_producto)
);