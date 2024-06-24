const {sql, connectionString} = require('../config'); // Asegúrate de que la ruta sea correcta

// GET function

exports.getProveedores = (req, res) => {
    const sqlSelect = 'SELECT * FROM PROVEEDORES';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.error('Error al obtener los proveedores', err);
            res.status(500).send('Error al obtener los proveedores');
            return;
        }
        console.log('Proveedores obtenidos con éxito', result);
        res.status(200).json(result);
    }
    );
}

// POST function

exports.createProveedores = (req, res) => {
    const { Rif, RazonSocial, Direccion, TelefonoL, TelefonoC, PersonaCont} = req.body;

    const sqlInsert = 'INSERT INTO PROVEEDORES ( Rif, RazonSocial, Direccion, TelefonoL, TelefonoC, PersonaCont) VALUES (?,?, ?, ?, ?, ?)';

    sql.query(connectionString, sqlInsert, [Rif, RazonSocial, Direccion, TelefonoL, TelefonoC, PersonaCont], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos', err);
            res.status(500).send('Error al insertar en la base de datos');
            return;
        }
        console.log('Proveedor creado con éxito', result);
        res.status(201).send('Proveedor creado con éxito');
    }
    );
}

// DELETE function

exports.deleteProveedores = (req, res) => {
    const { Rif } = req.body;
    
    const sqlDelete = 'DELETE FROM PROVEEDORES WHERE Rif = ?';
    
    sql.query(connectionString, sqlDelete, [Rif], (err, result) =>{
        if(err){
            console.error('Error al eliminar el Proveedor', err);
            res.status(500).send('Error al eliminar el Proveedor');
            return;
        }
        console.log('Proveedor eliminado con éxito', result);
        res.status(200).send('Proveedor eliminado con éxito');
    });
}

//PUT function

exports.updateProveedores = (req, res) => {
    const { Rif, RazonSocial, Direccion, TelefonoL, TelefonoC, PersonaCont } = req.body;

    const sqlUpdate = 'UPDATE PROVEEDORES SET RazonSocial = ?, Direccion = ?, TelefonoL = ?, TelefonoC = ?, PersonaCont = ? WHERE Rif = ?';

    sql.query(connectionString, sqlUpdate, [RazonSocial, Direccion, TelefonoL, TelefonoC, PersonaCont,Rif], (err, result) =>{
        if(err){
            console.error('Error al actualizar el Proveedor', err);
            res.status(500).send('Error al actualizar el Proveedor');
            return;
        }
        console.log('Proveedor actualizado con éxito', result);
        res.status(200).send('Proveedor actualizado con éxito');
    });
}