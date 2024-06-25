const {sql, connectionString} = require('../config'); // Asegúrate de que la ruta sea correcta

// GET function

exports.getProductos = (req, res) => {
    const sqlSelect = 'SELECT * FROM PRODUCTOS';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.error('Error al obtener los productos', err);
            res.status(500).send('Error al obtener los productos');
            return;
        }
        console.log('Productos obtenidos con éxito', result);
        res.status(200).json(result);
    });
}

// POST function

exports.createProducto = (req, res) => {
    const { CodProd, NombreP, Descripcion, Precio, Ecologico, Existencia, Fabricante, Maximo, Minimo, TipoPro, CodLinea } = req.body;

    const sqlInsert = 'INSERT INTO PRODUCTOS (CodProd, NombreP, Descripcion, Precio, Ecologico, Existencia, Fabricante, Maximo, Minimo, TipoPro, CodLinea) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    sql.query(connectionString, sqlInsert, [CodProd, NombreP, Descripcion, Precio, Ecologico, Existencia, Fabricante, Maximo, Minimo, TipoPro, CodLinea], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos', err);
            res.status(500).send('Error al insertar en la base de datos');
            return;
        }
        console.log('Producto creado con éxito', result);
        res.status(201).send('Producto creado con éxito');
    });
};

// DELETE function

exports.deleteProducto = (req, res) => {
    const { CodProd } = req.body;
    
    const sqlDelete = 'DELETE FROM PRODUCTOS WHERE CodProd = ?';
    
    sql.query(connectionString, sqlDelete, [CodProd], (err, result) =>{
        if(err){
            console.error('Error al eliminar el Producto', err);
            res.status(500).send('Error al eliminar el Producto');
            return;
        }
        console.log('Producto eliminado con éxito', result);
        res.status(200).send('Producto eliminado con éxito');
    });
}

//PUT function

exports.updateProducto = (req, res) => {
    const { CodProd, NombreP, Descripcion, Precio, Ecologico, Existencia, Fabricante, Maximo, Minimo, TipoPro, CodLinea } = req.body;

    const sqlUpdate = 'UPDATE PRODUCTOS SET NombreP = ?, Descripcion = ?, Precio = ?, Ecologico = ?, Existencia = ?, Fabricante = ?, Maximo = ?, Minimo = ?, TipoPro = ?, CodLinea = ? WHERE CodProd = ?';

    sql.query(connectionString, sqlUpdate, [NombreP, Descripcion, Precio, Ecologico, Existencia, Fabricante, Maximo, Minimo, TipoPro, CodLinea, CodProd], (err, result) => {
        if (err) {
            console.error('Error al actualizar el Producto', err);
            res.status(500).send('Error al actualizar el Producto');
            return;
        }
        console.log('Producto actualizado con éxito', result);
        res.status(200).send('Producto actualizado con éxito');
    });
}