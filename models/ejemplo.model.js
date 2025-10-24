import mongoose from "mongoose";

const ejemploSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
     apellido:{
        type: String,
        required: true
    },
     edad:{
        type: Number,
        required: true
    },
     contacto:{
        type: {String},
        required: true
    },
    
});

const Ejemplo = mongoose.model('ejemplo', ejemploSchema);

export default Ejemplo;