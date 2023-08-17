SELECT servicio.id_servicio,servicio.activo, servicio.nombre servicio, 
organizacion.id_organizacion, organizacion.nombre organizacion
FROM servicio
JOIN organizacion ON organizacion.id_organizacion = servicio.id_organizacion
-- WHERE organizacion.id_organizacion= 3