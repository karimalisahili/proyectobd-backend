const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getInventarios = (req, res) => {
    const RIFSuc = req.params.RIFSuc;

    const sqlSelect = `SELECT * FROM inventario_view WHERE RIFSuc = '${RIFSuc}'`;
    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.error('Error al obtener los inventario_view', err);
            res.status(500).json({ message: 'Error al obtener los inventario_view' });
            return;
        }
        console.log('inventario_view obtenidos con éxito', result);
        res.status(200).json(result);
    });
};

