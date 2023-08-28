SELECT personal.activo, personal.id_personal, personal.nombre personal, usuario.username username, organizacion.nombre organiz
FROM personal
JOIN usuario ON usuario.id_usuario= personal.id_usuario
JOIN organizacion ON organizacion.id_organizacion = personal.id_organizacion
-- WHERE personal.activo = TRUE

-- SELECT *
-- FROM personal

-- SELECT *
-- FROM usuario