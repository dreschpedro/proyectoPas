import mongoose from "mongoose";
const InstitucionSchema= mongoose.Schema({
    nombre:{
        type:String,required:true,trim:true
    },
    gerente:{
        type:String,required:true,trim:true
    },
  },
{
    timestamps:true
}
);
const Institucion = mongoose.model('Institucion', InstitucionSchema);
export default Institucion;