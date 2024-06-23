require('dotenv').config();

const express = require('express');
const router = require('./rutas');

const app = express();
const port = 3002;

app.use(express.json()); //middleware para manejar objetos json
app.use('/', router);




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

