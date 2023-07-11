import Inst from "../models/Info.js" // es necesario instanciar modelo Inst para registrar Insts

// consulta de todos los registros
const listaInst= async (req,res)=>{
    const inst = await Inst.find()
    res.json(inst)
  }
// consulta por id
const obtenerInst= async (req,res)=>{
    const inst = await Inst.findById(req.params.id)
    res.json(inst)
}

const registrarInst= async (req,res)=>{
    const inst = new Inst(req.body) // registro un Inst

    try {
        const instAlmacenado = await Inst.save();
        res.json(instAlmacenado)
    } catch (error) {
        console.log(error)
    }
}
//modificar registro
const modificarInst= async (req,res)=>{
    const inst = await Inst.findById(req.params.id)

    if (!inst) res.send ("el Inst no se encuentra")
    Inst.nombre=req.body.nombre;
    Inst.gerente=req.body.gerente;
    
    try {
        const instAlmacenado = await Inst.save();
        res.json(instAlmacenado)
    } catch (error) {
        console.log(error)
    }
    res.json(Inst)
}

const eliminarInst= async (req,res)=>{
    const inst = await Inst.findById(req.params.id)
    inst.deleteOne()
    res.send('Inst eliminado')

}

export {
    listaInst,
    obtenerInst,
    registrarInst,
    modificarInst,
    eliminarInst,
}