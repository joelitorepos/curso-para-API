// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Puerto configurado en el archivo .env o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON automáticamente
app.use(express.json());
// Middleware para habilitar CORS
app.use(cors());

// Ruta del archivo JSON que usaremos como "base de datos"
const dataFilePath = path.join(__dirname, 'archivo.json');

app.get('/api/data', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, jsonData) => {
        if (err) {
            return res.status(500).json({ error: 'No se pudo leer el archivo JSON' });
        }
        try {
            const data = JSON.parse(jsonData);
            res.json(data);
        } catch (parseError) {
            res.status(500).json({ error: 'Error al parsear el JSON' });
        }
    });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
