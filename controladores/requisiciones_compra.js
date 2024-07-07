const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET function

exports.getRequisicionesCompra = (req, res) => {
    const RIFSuc = req.params.RIFSuc; // Corrected parameter extraction

    // Corrected SQL query to include a proper WHERE condition
    const sqlSelect = `SELECT * FROM REQUISICIONES_COMPRA WHERE RIFSuc = '${RIFSuc}'`;

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.error('Error al obtener las requisiciones_compra', err);
            res.status(500).send('Error al obtener las requisiciones_compra');
            return;
        }
        console.log('Requisiciones_compra obtenidas con éxito', result);
        res.status(200).json(result);
    });
};

// POST function
exports.createRequisicionCompra = (req, res) => {
    const { RIFSuc, IdReq, CodProd, CantProd, Fecha } = req.body;

    if (!RIFSuc) {
        console.log('El campo RIFSuc es obligatorio');
        return res.status(400).json('El campo RIFSuc es obligatorio');
    }

    // SQL command to execute the stored procedure with the given Rif
    const sqlProcedure = `EXEC GenerarRequisicionesCompra @RIFSuc = ?`;

    // Flag to ensure only one response is sent
    let responseSent = false;

    try {
        // Execute the stored procedure with the provided Rif
        sql.query(connectionString, sqlProcedure, [RIFSuc], (err, result) => {
            if (!responseSent) {
                if (err) {
                    console.error('Error al ejecutar el procedimiento almacenado', err);
                    res.status(500).json('Error al ejecutar el procedimiento almacenado');
                    responseSent = true;
                    return;
                }
                console.log('Procedimiento almacenado ejecutado con éxito', result);
                res.status(200).json('Procedimiento almacenado ejecutado con éxito');
                responseSent = true;
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        if (!responseSent) {
            res.status(500).json('Unexpected error occurred');
            responseSent = true;
        }
    }
};



// DELETE function

exports.deleteRequisicionCompra = (req, res) => {
    const { RIFSuc, IdReq, CodProd } = req.body;

    // Adjust the SQL query to include conditions for RIFSuc and CodProd as well
    const sqlDelete = 'DELETE FROM REQUISICIONES_COMPRA WHERE RIFSuc = ? AND IdReq = ? AND CodProd = ?';

    // Pass all three parameters to the query
    sql.query(connectionString, sqlDelete, [RIFSuc, IdReq, CodProd], (err, result) => {
        if (err) {
            console.error('Error al eliminar la Requisicion_compra', err);
            res.status(500).json('Error al eliminar la Requisicion_compra');
            return;
        }
        console.log('Requisicion_compra eliminada con éxito', result);
        res.status(200).json('Requisicion_compra eliminada con éxito');
    });
};

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