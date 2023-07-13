import mongoose from "mongoose";
const servicioSchema = mongoose.Schema({
    nombre: {
        type: String, required: true, trim: true
    },
    activo: {
        type: Boolean,
        default: true
    }/*,
    institucion: { //se debe vincular con la coleccion de "institucion" mediante el id
        type: String, required: true, trim: true
    },*/
},
    {
        timestamps: true
    }
);
const Servicio_model = mongoose.model('Servicio', servicioSchema);
export default Servicio_model;