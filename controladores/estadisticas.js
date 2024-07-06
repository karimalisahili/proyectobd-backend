const {sql, connectionString} = require('../config'); // Asegúrate de que la ruta sea correcta

// GET function

exports.getMarcasServicios = (req, res) => {
    const sqlSelect = 'SELECT * from V_Est_Marcas_Servicios';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.error('Error al obtener la consulta', err);
            res.status(500).send('Error al obtener la consulta');
            return;
        }
        console.log('consulta obtenida con éxito', result);
        res.status(200).json(result);
    });
}
