require('dotenv').config();

const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const router = require('./rutas');

const app = express();
const port = 3002;

// Configura CORS para permitir solicitudes desde el origen específico
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json()); //middleware para manejar objetos json
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});