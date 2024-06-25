const {sql, connectionString} = require('../config'); // Asegúrate de que la ruta sea correcta

// GET function

exports.getProductosTienda = (req, res) => {
    const sqlSelect = 'SELECT * FROM PRODUCTOS_TIENDA';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.error('Error al obtener los productos_tienda', err);
            res.status(500).send('Error al obtener los productos_tienda');
            return;
        }
        console.log('Productos_tienda obtenidos con éxito', result);
        res.status(200).json(result);
    });
}

// POST function

exports.createProductosTienda = (req, res) => {
    const { CodProd } = req.body;

    const sqlInsert = 'INSERT INTO PRODUCTOS_TIENDA (CodProd) VALUES (?)';
    sql.query(connectionString, sqlInsert, [CodProd], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos', err);
            res.status(500).send('Error al insertar en la base de datos');
            return;
        }
        console.log('Productos_tienda creado con éxito', result);
        res.status(201).send('Productos_tienda creado con éxito');
    });
}

// DELETE function

exports.deleteProductosTienda = (req, res) => {
    const { CodProd } = req.body;
    
    const sqlDelete = 'DELETE FROM PRODUCTOS_TIENDA WHERE CodProd = ?';
    
    sql.query(connectionString, sqlDelete, [CodProd], (err, result) =>{
        if(err){
            console.error('Error al eliminar el Productos_tienda', err);
            res.status(500).send('Error al eliminar el Productos_tienda');
            return;
        }
        console.log('Productos_tienda eliminado con éxito', result);
        res.status(200).send('Productos_tienda eliminado con éxito');
    });
}