import mongoose from "mongoose";
const personaLSchema = mongoose.Schema({
    nombre: {
        type: String, required: true, trim: true
    },
    ntelefono: {
        type: String, required: true, trim: true
    },
    cuilt: {
        type: String, required: true, trim: true
    },
    especialidad: {
        type: String, required: true, trim: true
    },
    dni: {
        type: String, required: true, trim: true
    }
},
    {
        timestamps: true
    }
);
const Personal_model = mongoose.model('Personal', personaLSchema);
export default Personal_model;