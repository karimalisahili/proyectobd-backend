const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getFacturasTiendas = (req, res) => {
  const sqlSelect = 'SELECT * FROM FACTURAS_TIENDAS';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener las facturas de tiendas', err);
      res.status(500).json({ message: 'Error al obtener las facturas de tiendas' });
      return;
    }
    console.log('Facturas de tiendas obtenidas con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createFacturaTienda = (req, res) => {
  const { Fecha, Monto, Descuento, CodPago, CIResponsable} = req.body;

  const sqlInsert = `INSERT INTO FACTURAS_TIENDAS 
                     (Fecha, Monto, Descuento, CodPago, CIResponsable) 
                     VALUES (?, ?, ?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [Fecha, Monto, Descuento, CodPago, CIResponsable], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Factura de tienda creada con éxito', result);
    res.status(201).json({ message: 'Factura de tienda creada con éxito' });
  });
};

// DELETE operation
exports.deleteFacturaTienda = (req, res) => {
  const { CodF } = req.body;

  const sqlDelete = 'DELETE FROM FACTURAS_TIENDAS WHERE CodF = ?';

  sql.query(connectionString, sqlDelete, [CodF], (err, result) => {
    if (err) {
      console.error('Error al eliminar la factura de tienda', err);
      res.status(500).json({ message: 'Error al eliminar la factura de tienda' });
      return;
    }
    console.log('Factura de tienda eliminada con éxito', result);
    res.status(200).json({ message: 'Factura de tienda eliminada con éxito' });
  });
};
