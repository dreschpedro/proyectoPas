import mongoose from "mongoose";
import bcrypt from 'bcrypt'; // 


const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim:true,
    },
    password: {
        type: String,
        required: true,
        trim:true,
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    token:{
        type: String,
    },
    confirmado:{   // confirmar el email de confirmacion de usuario
        type: Boolean,
        default: false
    },
    rol:{
        type:String,required:true,trim:true
    }
},
{
    timestamps: true  // crea dos columnas mas una de creado y otra de actualizado
});

usuarioSchema.pre('save', async function(next){ // uso function porque  si aplico arrows function en muchos casos this referencia a otros datos para la BD
    
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10) // metodo genSalt genera el has - 10 son las rondas esa es la por defecto para que sea seguro el hash
   // luego qu ese genera ese salt accede a todos los datos que se estan mandando para guardar en la BD
    this.password =await bcrypt.hash(this.password, salt) // THIS HACE REFERENCIA AL OBJETO DEL USUARIO
    // lo que hace la sentencia anterior es hashear el password, el metodo toma dos parametros 
    // this.password es el string sin hashear y el salt que es el valor que produjo la generacion del salt
})

//

usuarioSchema.methods.comprobarPassword = async function(passwordForm){
    return await bcrypt.compare(passwordForm, this.password)
}

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
