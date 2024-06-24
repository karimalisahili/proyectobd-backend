const {sql, connectionString} = require('../config');

exports.getVehiculos = (req,res) => {

    const sqlSelect = 'SELECT * FROM VEHICULOS';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving Vehiculos');
        } else {
            res.status(200).json(result);

            console.log(result);
        }
    });
};

exports.createVehiculos = (req, res) => {
    const { Placa, TipoAceite, FechaAdq, CiResp, CodMarca, NumModelo } = req.body;

    const sqlInsert = `INSERT INTO VEHICULOS (Placa, TipoAceite, FechaAdq, CiResp, CodMarca, NumModelo) 
                       VALUES ('${Placa}', '${TipoAceite}', '${FechaAdq}', '${CiResp}', ${CodMarca}, ${NumModelo})`;

    sql.query(connectionString, sqlInsert, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error creating Vehiculo');
        } else {
            res.status(200).send('Vehiculo created successfully');
        }
    });
};

exports.deleteVehiculos = (req,res) => {
    const { CodVehiculo } = req.body;

    const sqlDelete = `DELETE FROM VEHICULOS WHERE CodVehiculo = ${CodVehiculo}`;

    sql.query(connectionString, sqlDelete, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error deleting Vehiculo');
        } else {
            res.status(200).send('Vehiculo deleted successfully');
        }
    });
};

exports.updateVehiculos = (req,res) => {
    const { CodVehiculo, Placa, TipoAceite, FechaAdq, CiResp, CodMarca, NumModelo } = req.body;

    const sqlUpdate = `UPDATE VEHICULOS SET Placa = '${Placa}', TipoAceite = '${TipoAceite}', FechaAdq = '${FechaAdq}', 
                       CiResp = '${CiResp}', CodMarca = ${CodMarca}, NumModelo = ${NumModelo} 
                       WHERE CodVehiculo = ${CodVehiculo}`;

    sql.query(connectionString, sqlUpdate, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error updating Vehiculo');
        } else {
            res.status(200).send('Vehiculo updated successfully');
        }
    });
};



