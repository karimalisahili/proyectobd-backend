const {sql, connectionString} = require('../config'); // Asegúrate de que la ruta sea correcta

// GET function

exports.getProductosServicios = (req, res) => {
    const sqlSelect = 'SELECT * FROM PRODUCTOS_SERVICIOS';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.error('Error al obtener los productos_servicios', err);
            res.status(500).json('Error al obtener los productos_servicios');
            return;
        }
        console.log('Productos_servicios obtenidos con éxito', result);
        res.status(200).json(result);
    });
}

// POST function

exports.createProductosServicio = (req, res) => {
    const { CodProd } = req.body;

    const sqlInsert = 'INSERT INTO PRODUCTOS_SERVICIOS (CodProd) VALUES (?)';
    sql.query(connectionString, sqlInsert, [CodProd], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos', err);
            res.status(500).json('Error al insertar en la base de datos');
            return;
        }
        console.log('Producto_servicio creado con éxito', result);
        res.status(200).json('Producto_servicio creado con éxito');
    });
}

// DELETE function

exports.deleteProductosServicio = (req, res) => {
    const { CodProd } = req.body;
    
    const sqlDelete = 'DELETE FROM PRODUCTOS_SERVICIOS WHERE CodProd = ?';
    
    sql.query(connectionString, sqlDelete, [CodProd], (err, result) =>{
        if(err){
            console.error('Error al eliminar el Producto_servicio', err);
            res.status(500).json('Error al eliminar el Producto_servicio');
            return;
        }
        console.log('Producto_servicio eliminado con éxito', result);
        res.status(200).json('Producto_servicio eliminado con éxito');
    });
}