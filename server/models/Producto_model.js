import mongoose from "mongoose";
const productoSchema= mongoose.Schema({
    nombre:{
        type:String,required:true,trim:true
    },
    precio:{
        type:String,required:true,trim:true
    },
    codBarra:{
        type:String,required:true,trim:true
    },
    estEntrega:{
        type:String,required:true,trim:true
    },
    fechEntrega:{
        type:String,required:true,trim:true
    },
  },
{
    timestamps:true
}
);
const Producto = mongoose.model('Producto', productoSchema);
export default Producto;