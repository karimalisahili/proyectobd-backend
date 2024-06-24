const {sql, connectionString} = require('../config');

exports.getTiposVehiculos = (req,res) => {
    const sqlSelect = 'SELECT * FROM TIPOS_VEHICULOS';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving TiposVehiculos');
        } else {
            res.status(200).json(result);
            
            console.log(result);
        }
    });
};

exports.createTiposVehiculos = (req, res) => {
   
};

exports.deleteTiposVehiculos = (req,res) => {
  
};

exports.updateTiposVehiculos = (req,res) => {
   
};