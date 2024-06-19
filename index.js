require('dotenv').config();

const express = require('express');
const router = require('./rutas');


const sql = require('msnodesqlv8');

console.log(process.env.DATABASE_SERVER);
console.log(process.env.DATABASE_NAME);

var server = process.env.DATABASE_SERVER.toString();

const connectionString = `server=`+server+`;Database=${process.env.DATABASE_NAME};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}`;
console.log(connectionString);
sql.query(connectionString, "SELECT * FROM ACTIVIDADES", (err, rows) => {
    if (err) {
        console.log(err);
    } else {
        console.log(rows);
    }
});

const app = express();
const port = 3002;

app.use(express.json()); //middleware para manejar objetos json
app.use('/', router);





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});