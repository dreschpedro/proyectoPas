SELECT personal.activo, personal.nombre personal, usuario.username, organizacion.nombre organizacion
FROM personal
JOIN organizacion ON organizacion.id_organizacion= personal.id_personal
JOIN usuario ON usuario.id_usuario= personal.id_usuario
-- WHERE personal.activo = TRUE