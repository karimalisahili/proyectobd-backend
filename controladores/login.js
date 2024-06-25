const { sql, connectionString } = require('../config');

exports.login = (req, res) => {
    const { rifSuc, rifEncargado } = req.body;
    console.log('Iniciando sesión con los siguientes datos:', rifSuc, rifEncargado);

    const sqlQuery = 'SELECT * FROM SUCURSALES WHERE RIFSuc = ? AND Encargado = ?';

    sql.query(connectionString, sqlQuery, [rifSuc, rifEncargado], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos', err);
            res.status(500).send('Error al consultar la base de datos');
            return;
        }

        if (results.length > 0) {
            console.log('Inicio de sesión exitoso', results[0]);
            res.status(200).send('Inicio de sesión exitoso');
        } else {
            console.log('Credenciales incorrectas');
            res.status(401).send('Credenciales incorrectas');
        }
    });
};