const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getOrdenesCompras = (req, res) => {
  const RIFSuc = req.params.RIFSuc;

  // Asegúrate de escapar correctamente el valor de RIFSuc para prevenir inyecciones SQL
  const sqlSelect = 'SELECT * FROM ORDENES_COMPRAS WHERE RIFSuc = ?';

  // Pasar RIFSuc como un arreglo para prevenir inyecciones SQL
  sql.query(connectionString, sqlSelect, [RIFSuc], (err, result) => {
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
  const { RIFProv, CodRequiCom, CodProd, Precio, RIFSuc } = req.body;

  const sqlInsert = `INSERT INTO ORDENES_COMPRAS 
                     (RIFProv, CodRequiCom, CodProd, Precio, RIFSuc) 
                     VALUES (?, ?, ?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [RIFProv, CodRequiCom, CodProd, Precio, RIFSuc], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Orden de compra creada con éxito', result);
    res.status(200).json({ message: 'Orden de compra creada con éxito' });
  });
};


// DELETE operation
exports.deleteOrdenCompra = (req, res) => {
  const { RIFSuc, CodOrden, CodRequiCom, CodProd } = req.body;

  const sqlDelete = 'DELETE FROM ORDENES_COMPRAS WHERE RIFSuc = ? AND CodOrden = ? AND CodRequiCom = ? AND CodProd = ?';

  sql.query(connectionString, sqlDelete, [RIFSuc, CodOrden, CodRequiCom, CodProd], (err, result) => {
    if (err) {
      console.error('Error al eliminar la orden de compra', err);
      res.status(500).json({ message: 'Error al eliminar la orden de compra' });
      return;
    }
    console.log('Orden de compra eliminada con éxito', result);
    res.status(200).json({ message: 'Orden de compra eliminada con éxito' });
  });
};


