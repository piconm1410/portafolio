const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para manejar el formulario de contacto
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Nuevo mensaje de contacto:');
    console.log(`Nombre: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Mensaje: ${message}`);
    res.json({ success: true, message: 'Mensaje recibido!' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});