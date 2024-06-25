const {sql, connectionString} = require('../config'); // Asegúrate de que la ruta sea correcta

// GET function

exports.getMarcas_vehiculos = (req, res) => {
    const sqlSelect = 'SELECT * FROM MARCAS_VEHICULOS';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.error('Error al obtener las marcas de vehiculos', err);
            res.status(500).send('Error al obtener las marcas de vehiculos');
            return;
        }
        console.log('Marcas de vehiculos obtenidas con éxito', result);
        res.status(200).json(result);
    }
    );
}

// POST function

exports.createMarcas_vehiculos = (req, res) => {
    const { Nombre } = req.body;

    const sqlInsert = 'INSERT INTO MARCAS_VEHICULOS (Nombre) VALUES (?)';

    sql.query(connectionString, sqlInsert, [Nombre], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos', err);
            res.status(500).send('Error al insertar en la base de datos');
            return;
        }
        console.log('Marca de vehiculo creada con éxito', result);
        res.status(201).send('Marca de vehiculo creada con éxito');
    });
}

// DELETE function

exports.deleteMarcas_vehiculos = (req, res) => {

    const { CodMarcaVeh } = req.body;

    const sqlDelete = 'DELETE FROM MARCAS_VEHICULOS WHERE CodMarcaVeh = ?';

    sql.query(connectionString, sqlDelete, [CodMarcaVeh], (err, result) =>{
        if(err){
            console.error('Error al eliminar la Marca Vehiculo', err);
            res.status(500).send('Error al eliminar la Marca Vehiculo');
            return;
        }
        console.log('Marca Vehiculo eliminada con éxito', result);
        res.status(200).send('Marca Vehiculo eliminada con éxito');
    });
}

//PUT function

exports.updateMarcas_vehiculos = (req, res) => {

    const {CodMarcaVeh , Nombre } = req.body

    const sqlUpdate = 'UPDATE MARCAS_VEHICULOS SET Nombre = ? WHERE CodMarcaVeh = ?';

    sql.query(connectionString, sqlUpdate, [Nombre, CodMarcaVeh], (err, result) => {
        if(err){
            console.error('Error al actualizar la Marca Vehiculo', err);
            res.status(500).send('Error al actualizar la Marca Vehiculo');
        } else {
            console.log('Marcas Vehiculos actualizada con exito', result);
            res.status(200).send('Marcas Vehiculos actualizada con exito');
        }
    })
}