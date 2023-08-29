import Cliente_model from "../models/Cliente_model.js";

// FUNCIONALIDADES
// consulta de todos los registros
const listar_cliente = async (req, res) => {
  try {
    const cliente = await Cliente_model.findAll();
    return res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de cliente";
    return res.status(500).json({ error: mensaje_error });
  }
};

// consulta por un registro (por id)
const obtener_cliente = async (req, res) => {
  const cliente_id = req.params.id;
  try {
    const cliente = await Cliente_model.findByPk(cliente_id);

    if (!cliente) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    return res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener el registro de cliente";
    return res.status(500).json({ error: mensaje_error });
  }
};

// Buscar cliente por DNI
const buscar_cliente_por_dni = async (req, res) => {
  const dni = req.params.dni; // Cambia de req.query a req.params
  console.log('DNI:', dni);

  try {
    const cliente = await Cliente_model.findOne({
      where: {
        dni: dni,
      },
    });


    if (!cliente) {
      return res.status(404).json({ mensaje: "No se encontró ningún cliente con ese DNI" });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al buscar el cliente por DNI";
    return res.status(500).json({ error: mensaje_error });
  }
};





// Buscar cliente por DNI
const buscar_cliente_dni_servicio = async (dni) => {
  try {
    const cliente = await Cliente_model.findOne({
      where: {
        dni: dni,
      },
    });

    return { success: true, message: "Cliente encontrado", data: cliente };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error al buscar cliente por DNI", data: null };
  }
};




// registro de cliente
const registrar_cliente = async (req, res) => {
  try {
    const cliente_body = req.body;

    const clienteExistente = await Cliente_model.findOne({
      where: {
        dni: cliente_body.dni,
      },
    });

    if (clienteExistente) {
      return res.status(409).json({ error: 'Ya existe un cliente con el mismo DNI' });
    }

    const cliente_almacenado = await Cliente_model.create(cliente_body);
    return res.status(201).json({ message: 'Registro creado', cliente_almacenado });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Ocurrió un error al registrar el cliente' });
  }
};











// modifica los datos buscando por id
const modificar_cliente = async (req, res) => {
  const cliente_id = req.params.id;
  try {
    const cliente = await Cliente_model.findByPk(cliente_id);

    if (!cliente) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    await cliente.update(req.body);
    return res.status(200).json({ message: "Registro Modificado", cliente });
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al modificar el cliente";
    return res.status(500).json({ error: mensaje_error });
  }
};

// elimina por id
const cambiar_estado_cliente = async (req, res) => {
  const cliente_id = req.params.id;

  try {
    const cliente = await cliente_model.findByPk(cliente_id);

    if (!cliente) {
      const mensaje = 'No se encontró el registro solicitado';
      return res.status(404).send(mensaje);
    }

    await cliente.update({ activo: !cliente.activo }); // Cambia el estado activo
    return res.status(200).json({ message: 'Estado modificado', activo: cliente.activo });
  } catch (error) {
    console.log(error);
    const mensaje_error = 'Ocurrió un error al cambiar el estado del registro';
    return res.status(500).json({ error: mensaje_error });
  }
};


// Exportar la función
export {
  listar_cliente,
  obtener_cliente,
  registrar_cliente,
  modificar_cliente,
  cambiar_estado_cliente,
  buscar_cliente_por_dni,
  buscar_cliente_dni_servicio
};
