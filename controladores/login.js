const { sql, connectionString } = require('../config');

exports.login = (req, res) => {
    const { rif_sucursal, cedula_encargado } = req.body;

    console.log('Iniciando sesión con los siguientes datos:', rif_sucursal, cedula_encargado);

    const sqlQuery = 'SELECT * FROM SUCURSALES WHERE RIFSuc = ? AND Encargado = ?';

    sql.query(connectionString, sqlQuery, [rif_sucursal, cedula_encargado], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos', err);
            res.status(500).json({ message: 'Error al consultar la base de datos', error: err });
            return;
        }

        if (results.length > 0) {
            console.log('Inicio de sesión exitoso', results[0]);
            // Podrías incluir más datos aquí, como un token de sesión o información del usuario
            res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', user: results[0] });
        } else {
            console.log('Credenciales incorrectas');
            res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
    });
};