import mongoose from "mongoose";
const servicioSchema= mongoose.Schema({
    nombre:{
        type:String,required:true,trim:true
    },
    ministerio:{
        type:String,required:true,trim:true
    },
  },
{
    timestamps:true
}
);
const Servicio = mongoose.model('Servicio', servicioSchema);
export default Servicio;