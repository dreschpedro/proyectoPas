import mongoose from "mongoose";
const infoSchema = mongoose.Schema({
    //esta es la informacion socioambiental
    cuilt: {
        type: String, required: true, trim: true
    }
},
    {
        timestamps: true
    }
);
const Info_model = mongoose.model('InfoSocial', infoSchema);
export default Info_model;