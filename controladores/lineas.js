const {sql, connectionString} = require('../config'); // Asegúrate de que la ruta sea correcta

// GET function

exports.getLineas = (req, res) => {
    const sqlSelect = 'SELECT * FROM LINEAS';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.error('Error al obtener las lineas', err);
            res.status(500).json('Error al obtener las lineas');
            return;
        }
        console.log('Lineas obtenidas con éxito', result);
        res.status(200).json(result);
    });
}

// POST function

exports.createLineas = (req, res) => {
    const {CodLineas, Descripcion } = req.body;

    const sqlInsert = 'INSERT INTO LINEAS (Descripcion) VALUES (?)';

    sql.query(connectionString, sqlInsert, [Descripcion], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos', err);
            res.status(500).json('Error al insertar en la base de datos');
            return;
        }
        console.log('Linea creada con éxito', result);
        res.status(200).json('Linea creada con éxito');
    });
}

// DELETE function

exports.deleteLineas = (req, res) => {
    const { CodLineas } = req.body;
    
    const sqlDelete = 'DELETE FROM LINEAS WHERE CodLineas = ?';
    
    sql.query(connectionString, sqlDelete, [CodLineas], (err, result) =>{
        if(err){
            console.error('Error al eliminar la Linea', err);
            res.status(500).json('Error al eliminar la Linea');
            return;
        }
        console.log('Linea eliminada con éxito', result);
        res.status(200).json('Linea eliminada con éxito');
    });
}

//PUT function

exports.updateLineas = (req, res) => {
    const { CodLineas, Descripcion } = req.body;

    const sqlUpdate = 'UPDATE LINEAS SET Descripcion = ? WHERE CodLineas = ?';

    sql.query(connectionString, sqlUpdate, [Descripcion, CodLineas], (err, result) =>{
        if(err){
            console.error('Error al actualizar la Linea', err);
            res.status(500).json('Error al actualizar la Linea');
            return;
        }
        console.log('Linea actualizada con éxito', result);
        res.status(200).json('Linea actualizada con éxito');
    });
}
