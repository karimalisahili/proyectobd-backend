const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getOrdenesCompras = (req, res) => {
  const sqlSelect = 'SELECT * FROM ORDENES_COMPRAS';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener las órdenes de compras', err);
      res.status(500).json({ message: 'Error al obtener las órdenes de compras' });
      return;
    }
    console.log('Órdenes de compras obtenidas con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createOrdenCompra = (req, res) => {
  const { NumFactProv, RIFProv, CodRequiCom, Precio, CantidadProd, RIFSuc } = req.body;

  const sqlInsert = `INSERT INTO ORDENES_COMPRAS 
                     (NumFactProv, RIFProv, CodRequiCom, Precio, CantidadProd, RIFSuc) 
                     VALUES (?, ?, ?, ?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [NumFactProv, RIFProv, CodRequiCom, Precio, CantidadProd, RIFSuc], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Orden de compra creada con éxito', result);
    res.status(201).json({ message: 'Orden de compra creada con éxito' });
  });
};

// DELETE operation
exports.deleteOrdenCompra = (req, res) => {
  const { CodOrden } = req.body;

  const sqlDelete = 'DELETE FROM ORDENES_COMPRAS WHERE CodOrden = ?';

  sql.query(connectionString, sqlDelete, [CodOrden], (err, result) => {
    if (err) {
      console.error('Error al eliminar la orden de compra', err);
      res.status(500).json({ message: 'Error al eliminar la orden de compra' });
      return;
    }
    console.log('Orden de compra eliminada con éxito', result);
    res.status(200).json({ message: 'Orden de compra eliminada con éxito' });
  });
};
