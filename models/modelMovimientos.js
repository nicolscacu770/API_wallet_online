const mongoose = require('mongoose');

const {Schema} = mongoose;

const schemaMovimiento = new Schema( {
    id : {
        type : Number,
        required : true,
        unique : true
    },
    nombre : {
        type : String,
        required : true,
        unique : true
    },
    descripcion : {
        type : String,
        required : false,
        unique : false
    }, 
    tipo : {
        type : String,
        required : false,
        unique : false
    }, 
    valor : {
        type : Number,
        required : true,
        unique : true
    },
    fecha : {
        type : String,
        required : true,
        unique : false
    },
    hora : {
        type : String,
        required : true,
        unique : false
    },

    usuario : {
        type : Schema.Types.ObjectId,
        ref : 'usuario'
    }
})

module.exports = mongoose.model('movimiento', schemaMovimiento);