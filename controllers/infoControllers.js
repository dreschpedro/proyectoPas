import Info_model from "../models/Info.js" // es necesario instanciar modelo Infos para registrar Infos

// consulta de todos los registros
const listaInfos = async (req, res) => {
    const info = await Info_model.find()
    res.json(info)
}
// consulta por id
const obtenerinfo = async (req, res) => {
    const info_id= req.params.id;
    const info = await Info_model.findById(info_id)
    res.json(info)
}

const registrarInfo = async (req, res) => {
    const info = new Info_model(req.body) // registro un info

    try {
        const infoAlmacenada = await Info_model.save();
        res.json(infoAlmacenada)
    } catch (error) {
        console.log(error)
    }
}
//modificar registro
const modificarinfo = async (req, res) => {
    const info_id= req.params.id;
    const info = await Info_model.findById(info_id)

    if (!info) res.send("La informacion no se encuentra")
    // datos que son 
    info.cuilt = req.body.cuilt;

    try {
        const infoAlmacenada = await Info_model.save();
        res.json(infoAlmacenada)
    } catch (error) {
        console.log(error)
    }
    res.json(infoAlmacenada)
}

const eliminarinfo = async (req, res) => {
    const info_id= req.params.id;
    const info = await Info_model.findById(info_id)
    info.deleteOne()
    res.send('Informacion eliminada')

}

export {
    listaInfos,
    obtenerinfo,
    registrarInfo,
    modificarinfo,
    eliminarinfo,
}