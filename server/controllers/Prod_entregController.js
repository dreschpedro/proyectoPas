import ProdEntreg_model from "../models/ProdEntreg_model.js";

// FUNCIONALIDADES
// consulta de todos los registros
const listar_prodEnt = async (req, res) => {
  try {
    const prodEnt = await ProdEntreg_model.findAll();
    return res.status(200).json(prodEnt);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener los registros de prodEnt";
    return res.status(500).json({ error: mensaje_error });
  }
};

// consulta por un registro (por id)
const obtener_prodEnt = async (req, res) => {
  const prodEnt_id = req.params.id;
  try {
    const prodEnt = await ProdEntreg_model.findByPk(prodEnt_id);

    if (!prodEnt) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    return res.status(200).json(prodEnt);
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al obtener el registro de prodEnt";
    return res.status(500).json({ error: mensaje_error });
  }
};

// registro de prodEnt
const registrar_prodEnt = async (req, res) => {
  try {
    const prodEnt_body = req.body;
    const prodEnt_almacenado = await ProdEntreg_model.create(prodEnt_body);
    return res.status(200).json({ message: "Registro creado", prodEnt_almacenado });
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al registrar la prodEnt";
    return res.status(500).json({ error: mensaje_error });
  }
};

// modifica los datos buscando por id
const modificar_prodEnt = async (req, res) => {
  const prodEnt_id = req.params.id;
  try {
    const prodEnt = await ProdEntreg_model.findByPk(prodEnt_id);

    if (!prodEnt) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    await prodEnt.update(req.body);
    return res.status(200).json({ message: "Registro Modificado", prodEnt });
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al modificar la prodEnt";
    return res.status(500).json({ error: mensaje_error });
  }
};

// elimina por id
const eliminar_prodEnt = async (req, res) => {
  const prodEnt_id = req.params.id;
  try {
    const prodEnt = await ProdEntreg_model.findByPk(prodEnt_id);

    if (!prodEnt) {
      const mensaje = "No se encontró el registro solicitado";
      return res.status(404).send(mensaje);
    }

    await prodEnt.destroy();
    return res.status(200).send("Registro eliminado");
  } catch (error) {
    console.log(error);
    const mensaje_error = "Ocurrió un error al eliminar el registro";
    return res.status(500).json({ error: mensaje_error });
  }
};

// exports
export {
  listar_prodEnt,
  obtener_prodEnt,
  registrar_prodEnt,
  modificar_prodEnt,
  eliminar_prodEnt
};