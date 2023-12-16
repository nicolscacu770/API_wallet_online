const mongoose = require('mongoose');

const {Schema} = mongoose;

const schemaCliente = new Schema( {
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
    apellido : {
        type : String,
        required : true,
        unique : true
    }, 
    DNI : {
        type : Number,
        required : true,
        unique : true
    },
    telefono : {
        type : Number,
        required : true,
        unique : true
    },

    movimientos : [
        {
            type : Schema.Types.ObjectId,
            ref : 'movimiento'
        }
    ]
})

module.exports = mongoose.model('cliente', schemaCliente);