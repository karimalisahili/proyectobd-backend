const {sql, connectionString} = require('../config'); // Asegúrate de que la ruta sea correcta

// GET function

exports.getServicios = (req, res) => {
    const sqlSelect = 'SELECT * FROM SERVICIOS';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.error('Error al obtener los servicios', err);
            res.status(500).send('Error al obtener los servicios');
            return;
        }
        console.log('Servicios obtenidos con éxito', result);
        res.status(200).json(result);
    }
    );
}

// POST function

exports.createServicios = (req, res) => {

    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
    const {Descripcion, CI_Coord} = req.body;

    const sqlInsert = 'INSERT INTO SERVICIOS (Descripcion, CI_Coord) VALUES (?, ?)';

    sql.query(connectionString, sqlInsert, [Descripcion, CI_Coord], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos', err);
            res.status(500).json('Error al insertar en la base de datos');
            return;
        }
        console.log('Servicio creado con éxito', result);
        res.status(201).json('Servicio creado con éxito');
    });
}

// DELETE function

exports.deleteServicios = (req, res) => {
    const { CodigoServ } = req.body;
    
    const sqlDelete = 'DELETE FROM SERVICIOS WHERE CodigoServ = ?';

    sql.query(connectionString, sqlDelete, [CodigoServ], (err, result) =>{
        if(err){
            console.error('Error al eliminar el Servicio', err);
            res.status(500).send('Error al eliminar el Servicio');
            return;
        }
        console.log('Servicio eliminado con éxito', result);
        res.status(200).send('Servicio eliminado con éxito');
    });
}

//PUT function

exports.updateServicios = (req, res) => {
    const { CodigoServ, Descripcion, CI_Coord } = req.body;

    const sqlUpdate = 'UPDATE SERVICIOS SET Descripcion = ?, CI_Coord = ? WHERE CodigoServ = ?';

    sql.query(connectionString, sqlUpdate, [Descripcion, CI_Coord, CodigoServ], (err, result) => {
        if (err) {
            console.error('Error al actualizar el Servicio', err);
            res.status(500).send('Error al actualizar el Servicio');
            return;
        }
        console.log('Servicio actualizado con éxito', result);
        res.status(200).send('Servicio actualizado con éxito');
    });
}    