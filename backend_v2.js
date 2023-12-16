const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://nicoelduro556:hidesense8790@clusternicolas.5ytne.mongodb.net/API_elect2?retryWrites=true&w=majority');
const db = mongoose.connection;

const user = new mongoose.Schema({
    id: Number,
    nombre: String,
    apellido: String,
    DNI: Number,
    telefono: Number,
});
const Usuario = mongoose.model('Usuario', user);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/usuarios', async (req, res) => {
    const { id, nombre, apellido, DNI, telefono } = req.body;

    try {
        const nuevoUsuario = new Usuario({
            id,
            nombre,
            apellido,
            DNI,
            telefono
        });

        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json(usuarioGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/usuarios/:id', getUsuario, (req, res) => {
    res.json(res.usuario);
});


app.put('/usuarios/:id', getUsuario, async (req, res) => {
    if (req.body.nombre != null) {
        res.usuario.nombre = req.body.nombre;
    }
    if (req.body.apellido != null) {
        res.usuario.apellido = req.body.apellido;
    }
    if (req.body.DNI != null) {
        res.usuario.DNI = req.body.DNI;
    }
    if (req.body.telefono != null) {
        res.usuario.telefono = req.body.telefono;
    }

    try {
        const usuarioActualizado = await res.usuario.save();
        res.json(usuarioActualizado);
    } catch (err) {
        res.status(400).json({ message: 'Usuario no actualizado' });
    }
});


app.delete('/usuarios/:id', getUsuario, async (req, res) => {
    try {
        await Usuario.deleteOne({ id: res.usuario.id });
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ message: 'Usuario no eliminado'});
    }
});

async function getUsuario(req, res, next) {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.usuario = usuario;
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Error al buscar el usuario' });
    }
}

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});