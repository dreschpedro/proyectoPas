import mongoose from "mongoose";
const InstitucionSchema = mongoose.Schema({
    nombre: {
        type: String, required: true, trim: true
    },
    encargado: {
        type: String, required: true, trim: true
    },
},
    {
        timestamps: true
    }
);
const inst_model = mongoose.model('Institucion', InstitucionSchema);
export default inst_model;