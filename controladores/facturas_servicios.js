const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getFacturasServicios = (req, res) => {
  const sqlSelect = 'SELECT * FROM FACTURAS_SERVICIOS';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener los registros de FACTURAS_SERVICIOS', err);
      res.status(500).json({ message: 'Error al obtener los registros de FACTURAS_SERVICIOS' });
      return;
    }
    console.log('Registros de FACTURAS_SERVICIOS obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createFacturaServicio = (req, res) => {
  const { Fecha, Monto, Descuento } = req.body;

  const sqlInsert = `INSERT INTO FACTURAS_SERVICIOS 
                     (Fecha, Monto, Descuento) 
                     VALUES (?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [Fecha, Monto, Descuento], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Registro de FACTURAS_SERVICIOS creado con éxito', result);
    res.status(201).json({ message: 'Registro de FACTURAS_SERVICIOS creado con éxito' });
  });
};

// DELETE operation
exports.deleteFacturaServicio = (req, res) => {
  const { CodF } = req.body;

  const sqlDelete = 'DELETE FROM FACTURAS_SERVICIOS WHERE CodF = ?';

  sql.query(connectionString, sqlDelete, [CodF], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro de FACTURAS_SERVICIOS', err);
      res.status(500).json({ message: 'Error al eliminar el registro de FACTURAS_SERVICIOS' });
      return;
    }
    console.log('Registro de FACTURAS_SERVICIOS eliminado con éxito', result);
    res.status(200).json({ message: 'Registro de FACTURAS_SERVICIOS eliminado con éxito' });
  });
};
