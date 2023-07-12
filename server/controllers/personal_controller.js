import Personal_model from "../models/Personal_model.js"

// FUNCIONALIDADES
// consulta de todos los registros
const listar_personal = async (req, res) => {
  const personal = await Personal_model.find()
  res.json(personal)
}

// consulta por un registro (por id)
const obtener_personal = async (req, res) => {
  const personal_id = req.params.id; //busca segun el id registrado en la BD
  const personal = await Personal_model.findById(personal_id);

  if (!personal) { // si no existe ese id, envia mensaje de error
    const mensaje = 'No se encontró el registro solicitado';
    return res.status(404).send(mensaje);
  }
  res.json(personal); //muestra todos los registros
}

// registro de Personal
const registrar_personal = async (req, res) => {

  try {
    const personal_body = new Personal_model(req.body);
    const personal_almacenado = await personal_body.save();
    res.json({ message: "Registro creado", personal_almacenado });

  } catch (error) {
    console.log(error);

    const mensaje_error = 'Ocurrió un error al registrar el Personal';
    res.status(500).json({ error: mensaje_error });
  }
};

// modifica los datos buscando por id
const modificar_personal = async (req, res) => {
  const personal_id = req.params.id;
  const personal = await Personal_model.findById(personal_id);

  if (!personal) res.send("El Registro no se encuentra")
  personal.nombre = req.body.nombre;
  personal.ntelefono = req.body.ntelefono;
  personal.cuilt = req.body.cuilt;
  personal.especialidad = req.body.especialidad;
  personal.dni = req.body.dni;

  try {
    const personal_almacenado = await personal.save();
    res.json({ message: "Registro Modificado", personal_almacenado });
  } catch (error) {
    console.log(error)
  }
}

// elimina por id
const eliminar_personal = async (req, res) => {
  const personal_id = req.params.id;
  const personal = await Personal_model.findById(personal_id)

  if (personal) { // si encuentra el personal (id) -> lo elimina
    personal.deleteOne()
    res.send('Registro eliminado')
  } else { // si no encuentra el personal (id) -> envia mensaje de error
    const mensaje = 'No se encontró el Registro solicitado';
    return res.status(404).send(mensaje);
  }

}


// exports
export {
  listar_personal,
  obtener_personal,
  registrar_personal,
  modificar_personal,
  eliminar_personal
}