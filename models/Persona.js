import mongoose from "mongoose";
const personaSchema= mongoose.Schema({
    nombre:{
        type:String,required:true,trim:true
    },
    cuilt:{
        type:String,required:true,trim:true
    },
    dni:{
        type:String,required:true,trim:true
    },
    domicilio:{
        type:String,required:true,trim:true
    },
    nDeTelefono:{
        type:String,required:true,trim:true
    },
  },
{
    timestamps:true
}
);
const Persona = mongoose.model('Persona', personaSchema);
export default Persona;