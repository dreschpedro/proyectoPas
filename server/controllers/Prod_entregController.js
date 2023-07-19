import ProdEntreg_model from "../models/ProdEntreg_model.js"

// FUNCIONALIDADES
// consulta de todos los registros
const listar_prodEnt = async (req, res) => {
  const prodEnt = await ProdEntreg_model.find()
  return res.status(200).json(prodEnt)
}

// consulta por un registro (por id)
const obtener_prodEnt = async (req, res) => {
  const prodEnt_id = req.params.id; //busca segun el id registrado en la BD
  const prodEnt = await ProdEntreg_model.findById(prodEnt_id);

  if (!prodEnt) { // si no existe ese id, envia mensaje de error
    const mensaje = 'No se encontró el registro solicitado';
    return res.status(404).send(mensaje);
  }
  return res.status(200).json(prodEnt); //muestra todos los registros
}

// registro de prodEnt
const registrar_prodEnt = async (req, res) => {

  try {
    const prodEnt_body = new ProdEntreg_model(req.body);
    const prodEnt_almacenado = await prodEnt_body.save();
    return res.status(200).json({ message: "Registro creado", prodEnt_almacenado });

  } catch (error) {
    console.log(error);

    const mensaje_error = 'Ocurrió un error al registrar la prodEnt';
    return res.status(500).json({ error: mensaje_error });
  }
};

// modifica los datos buscando por id
const modificar_prodEnt = async (req, res) => {
  const prodEnt_id = req.params.id;
  const prodEnt = await ProdEntreg_model.findById(prodEnt_id);

  if (!prodEnt) res.send("El Registro no se encuentra")
  prodEnt.nombre = req.body.nombre;
  prodEnt.precio = req.body.precio;
  prodEnt.codBarra = req.body.codBarra;
  prodEnt.estEntrega = req.body.estEntrega;
  prodEnt.fechEntrega = req.body.fechEntrega;

  try {
    const prodEnt_almacenado = await prodEnt.save();
    return res.status(200).json({ message: "Registro Modificado", prodEnt_almacenado });
  } catch (error) {
    console.log(error)
  }
}

// elimina por id
const eliminar_prodEnt = async (req, res) => {
  const prodEnt_id = req.params.id;
  const prodEnt = await ProdEntreg_model.findById(prodEnt_id)

  if (prodEnt) { // si encuentra el prodEnt (id) -> lo elimina
    prodEnt.deleteOne()
    return res.status(200).send('Registro eliminado')
  } else { // si no encuentra el prodEnt (id) -> envia mensaje de error
    const mensaje = 'No se encontró el registro solicitado';
    return res.status(404).send(mensaje);
  }

}


// exports
export {
  listar_prodEnt,
  obtener_prodEnt,
  registrar_prodEnt,
  modificar_prodEnt,
  eliminar_prodEnt
}