const {sql, connectionString} = require('../config');

exports.getTiposVehiculos = (req,res) => {
    const sqlSelect = 'SELECT * FROM TIPOS_VEHICULOS';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json('Error retrieving TiposVehiculos');
        } else {
            res.status(200).json(result);

        }
    });
};

exports.createTiposVehiculos = (req, res) => {
    const {CodTipoV, Descripcion } = req.body;
    const sqlInsert = 'INSERT INTO TIPOS_VEHICULOS (Descripcion) VALUES (?)';

    sql.query(connectionString, sqlInsert, [Descripcion], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json('Error creating TipoVehiculo');
        } else {
            res.status(200).json('TipoVehiculo created successfully');
        }
    });
};

exports.deleteTiposVehiculos = (req,res) => {
    const { CodTipoV } = req.body;
    const sqlDelete = 'DELETE FROM TIPOS_VEHICULOS WHERE CodTipoV = ?';

    sql.query(connectionString, sqlDelete, [CodTipoV], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json('Error deleting TipoVehiculo');
        } else {
            res.status(200).json('TipoVehiculo deleted successfully');
        }
    });
};

exports.updateTiposVehiculos = (req,res) => {
    
    const {CodTipoV, Descripcion } = req.body;
    const sqlUpdate = 'UPDATE TIPOS_VEHICULOS SET Descripcion = ? WHERE CodTipoV = ?';

    sql.query(connectionString, sqlUpdate, [Descripcion, CodTipoV], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json('Error updating TipoVehiculo');
        } else {
            res.status(200).json('TipoVehiculo updated successfully');
        }
    });
};