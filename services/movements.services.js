const modelMovimientos = require('../models/modelMovimientos');
const movementModel = require('../models/modelMovimientos');
const usuarioModel = require('../models/modelUsuarios');

module.exports = {
    findAll : async(req,res) => {
        try {
            const movimientos = await movementModel.find({});

            return res.status(200).json({state: true, msg: "Recuperar Todos los registros", "data": movimientos});
        } catch (error) {
            return res.status(500).json({"state": false, "error": error});
        }
    },

    findById : async(req,res) => {
        const {id} = req.params;
        try {
            const movement = await movementModel.findById(id);
            if(movement){
                return res.status(200).json({"state": true, "data": movement});    
            }else{
                return res.status(404).json({"state": false, "msg": "elemento no encontrado"});
            }
        } catch (error) {
            return res.status(500).json({"state": false, "error": error});
        }
        
    },

    save : async(req,res) => {
        const {idUser} = req.params;
        const usuario = await usuarioModel.findById(idUser);

        if( usuario ){
            const {id, nombre, descripcion, tipo, valor} = req.body
            const data = {"id": id, "nombre": nombre, "descripcion": descripcion, "tipo": tipo, "valor": valor, "fecha": getFecha(), "hora": getHora()}

            try {
                const movimiento = new modelMovimientos(data);
                movimiento.usuario = usuario;
                const movimientoGuardado = await movimiento.save();

                usuario.movimientos.push(movimiento);
                await usuario.save();
                
                return res.status(200).json({"state": true, "data":movimientoGuardado});
            } catch (error) {
                console.log(error.message);
                return res.status(500).json({"state": false, "error": "no available :v"});
            }
        }else{

        }
        
    },

    update : async(req,res) => {
        const {id} = req.params;
        let dateAct = new Date();
        let founded;

        const fechaHoy = `${dateAct.getDate()}/${dateAct.getMonth()}/${dateAct.getFullYear()}`
        const horaActual = `${dateAct.getHours()}:${dateAct.getMinutes()}:${dateAct.getSeconds()}`;
           
        const { name, type, value} = req.body
        const data = {"id": id, "nombre": name, "tipo": type, "valor": value, "fecha": fechaHoy, "hora": horaActual}

        try {
            for (let pos = 0; pos < datos.movimientos.length; pos++) {
                if(datos.movimientos[pos].id == id){
                    datos.movimientos[pos] = data; 
                    founded = true;
                }
            }

            if(founded){
                
                return res.status(200).json({"state": true, "msg": "elemento actualizado correctamente", "data": data});    
            }else{
                return res.status(404).json({"state": false, "msg": "elemento no encontrado"});
            }
        } catch (error) {
            return res.status(500).json({"state": false, "error": "no available :v"});
        }
    },

    deletear : async(req,res) => {
        const {id} = req.params;
        let founded;
        try{
            for (let pos = 0; pos < datos.movimientos.length; pos++) {
                if(datos.movimientos[pos].id == id){
                    datos.movimientos.splice(pos, 1);
                    founded = true;
                }
            }

            if(founded){
                let datosJSON = JSON.stringify(datos);
                fs.writeFileSync('data.json', datosJSON);
                return res.status(200).json({"state": 200, "msg": "elemento eliminado correctamente"});    
            }else{
                return res.status(404).json({"state": false, "msg": "elemento no encontrado"});
            }
        }catch(error){
            return res.status(500).json({"state": false, "error": "no available :v"});
        }
    }
}

function getFecha() {
    let dateAct = new Date();
    const dia = dateAct.getDate();
    const mes = dateAct.getMonth() + 1;
    const año = dateAct.getFullYear();

    return `${dia}/${mes}/${año}`;
}

function getHora() {
    const dateAct = new Date();
    const hora = dateAct.getHours();
    const minutos = dateAct.getMinutes();
    const segundos = dateAct.getSeconds();

    return  `${hora}:${minutos}:${segundos}`;
}