const {sql, connectionString} = require('../config'); // Asegúrate de que la ruta sea correcta

// GET function

exports.getRequisicionesCompra = (req, res) => {
    const sqlSelect = 'SELECT * FROM REQUISICIONES_COMPRA';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.error('Error al obtener las requisiciones_compra', err);
            res.status(500).send('Error al obtener las requisiciones_compra');
            return;
        }
        console.log('Requisiciones_compra obtenidas con éxito', result);
        res.status(200).json(result);
    });
}

// POST function

exports.createRequisicionCompra = (req, res) => {
    const { Fecha, CantProd, CodProd } = req.body; 

    const sqlInsert = 'INSERT INTO REQUISICIONES_COMPRA (Fecha, CantProd, CodProd) VALUES (?, ?, ?)';

    sql.query(connectionString, sqlInsert, [Fecha, CantProd, CodProd], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos', err);
            res.status(500).send('Error al insertar en la base de datos');
            return;
        }
        console.log('Requisicion_compra creada con éxito', result);
        res.status(201).send('Requisicion_compra creada con éxito');
    });
};

// DELETE function

exports.deleteRequisicionCompra = (req, res) => {
    const { IdReq } = req.body;
    
    const sqlDelete = 'DELETE FROM REQUISICIONES_COMPRA WHERE IdReq = ?';
    
    sql.query(connectionString, sqlDelete, [IdReq], (err, result) =>{
        if(err){
            console.error('Error al eliminar la Requisicion_compra', err);
            res.status(500).send('Error al eliminar la Requisicion_compra');
            return;
        }
        console.log('Requisicion_compra eliminada con éxito', result);
        res.status(200).send('Requisicion_compra eliminada con éxito');
    });
}

//PUT function

exports.updateRequisicionCompra = (req, res) => {
    const { IdReq, Fecha, CantProd, CodProd } = req.body;

    const sqlUpdate = 'UPDATE REQUISICIONES_COMPRA SET Fecha = ?, CantProd = ?, CodProd = ? WHERE IdReq = ?';
    sql.query(connectionString, sqlUpdate, [Fecha, CantProd, CodProd, IdReq], (err, result) => {
        if (err) {
            console.error('Error al actualizar la Requisicion_compra', err);
            res.status(500).send('Error al actualizar la Requisicion_compra');
            return;
        }
        console.log('Requisicion_compra actualizada con éxito', result);
        res.status(200).send('Requisicion_compra actualizada con éxito');
    });
}