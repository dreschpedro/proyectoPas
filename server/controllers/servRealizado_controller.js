import { buscar_cliente_dni_servicio } from "./cliente_controller.js";
import ServRealizado_model from "../models/ServRealizado_model.js";

// FUNCIONALIDADES
// consulta de todos los registros
const listar_servReal = async (req, res) => {
  try {
    const servReal = await ServRealizado_model.findAll();
    return res.status(200).json(servReal);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de servReal";
    return res.status(500).json({ error: mensaje_error });
  }
};

// consulta por un registro (por id)
const obtener_servReal = async (req, res) => {
  const servReal_id = req.params.id;
  try {
    const servReal = await ServRealizado_model.findByPk(servReal_id);

    if (!servReal) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    return res.status(200).json(servReal);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener el registro de servReal";
    return res.status(500).json({ error: mensaje_error });
  }
};

const registrar_servReal_con_cliente = async (req, res) => {
  const { dni, id_servicio, id_usuario } = req.body;

  try {
    // Usar await para esperar la respuesta asincrónica
    const clienteResponse = await buscar_cliente_dni_servicio(dni);

    if (clienteResponse.success) {
      const cliente = clienteResponse.data;
      let id_cliente = cliente.id_cliente;

      // Crea el registro de servicioRealizado con id_cliente, id_servicio y id_usuario
      const servReal_body = { id_cliente, id_servicio, id_usuario };
      const servReal_almacenado = await ServRealizado_model.create(servReal_body);

      return res.status(200).json({ message: "Registro creado exitosamente", servReal_almacenado });
    } else {
      return res.status(400).json({ error: "No se pudo buscar el cliente por DNI" });
    }
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al registrar el servReal";
    return res.status(500).json({ error: mensaje_error });
  }
};

// modifica los datos buscando por id
const modificar_servReal = async (req, res) => {
  const servReal_id = req.params.id;
  try {
    const servReal = await ServRealizado_model.findByPk(servReal_id);

    if (!servReal) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    await servReal.update(req.body);
    return res.status(200).json({ message: "Registro Modificado", servReal });
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al modificar el servReal";
    return res.status(500).json({ error: mensaje_error });
  }
};

// elimina por id
const eliminar_servReal = async (req, res) => {
  const servReal_id = req.params.id;
  try {
    const servReal = await ServRealizado_model.findByPk(servReal_id);

    if (!servReal) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    await servReal.destroy();
    return res.status(200).send("Registro eliminado");
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al eliminar el registro";
    return res.status(500).json({ error: mensaje_error });
  }
};

// Exporta la función
export {
  listar_servReal,
  obtener_servReal,
  modificar_servReal,
  eliminar_servReal,
  registrar_servReal_con_cliente // Agrega esta línea
};