import mongoose from "mongoose";
const productoSchema = mongoose.Schema({
    nombre: {
        type: String, required: true, trim: true
    },
    precio: {
        type: Number, required: true, trim: true
    },
    codBarra: {
        type: String, required: true, trim: true
    },
    entregado: {
        type: Boolean,
        default: true
    },
    fechEntrega: {
        type: String, required: true, trim: true
    },
    activo: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
);
const Producto_model = mongoose.model('Producto', productoSchema);
export default Producto_model;