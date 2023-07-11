import Personal_model from "../models/personal.js"


// consulta de todos los registros
const listar_personal = async (req, res) => {
  const personal = await Personal_model.find()
  res.json(personal)
}

const obtener_personal = async (req, res) => {
  const personal_id = req.params.id;
  const personal = await Personal_model.findById(personal_id);

  if (!personal) {
    const mensaje= 'No se encontró el registro solicitado';
    return res.status(404).send(mensaje);
  }

  res.json(personal);
}

const registrar_personal = async (req, res) => {

  try {
    const personal_body = new Personal_model(req.body); // registro personal
    const personal_almacenado = await personal_body.save();
    res.json(personal_almacenado);

  } catch (error) {
    console.log(error);

    const mensaje_error = 'Ocurrió un error al registrar el Personal';
    res.status(500).json({ error: mensaje_error });
  }
};
//modificar registro
const modificar_personal = async (req, res) => {
  const personal_id = req.params.id;
  const personal = await Personal_model.findById(personal_id)

  if (!personal) res.send("El Personal no se encuentra")
  personal.nombre = req.body.nombre;
  personal.autor = req.body.autor;

  try {
    const personal_almacenado = await personal.save();
    res.json(personal_almacenado)
  } catch (error) {
    console.log(error)
  }
  res.json(personal)
}

const eliminar_personal = async (req, res) => {
  const personal_id = req.params.id;
  const personal = await Personal_model.findById(personal_id)
  personal.deleteOne()
  res.send('Personal eliminado')

}

export {
  listar_personal,
  obtener_personal,
  registrar_personal,
  modificar_personal,
  eliminar_personal
}