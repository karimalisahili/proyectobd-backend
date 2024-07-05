const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getPagos = (req, res) => {
  const sqlSelect = 'SELECT * FROM PAGOS';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener los pagos', err);
      res.status(500).json({ message: 'Error al obtener los pagos' });
      return;
    }
    console.log('Pagos obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createPago = (req, res) => {
  const { Fecha, Monto, TipoPago, TipoEfectivo, Referencia, NroTelf, TipoTarjeta, Banco, NumTarjeta, NumFacturaServicio, NumR } = req.body;

  const sqlInsert = `INSERT INTO PAGOS 
                     (Fecha, Monto, TipoPago, TipoEfectivo, Referencia, NroTelf, TipoTarjeta, Banco, NumTarjeta, NumFacturaServicio, NumR) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [Fecha, Monto, TipoPago, TipoEfectivo, Referencia, NroTelf, TipoTarjeta, Banco, NumTarjeta, NumFacturaServicio, NumR], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos', error: err });
      return;
    }
    console.log('Pago creado con éxito', result);
    res.status(201).json({ message: 'Pago creado con éxito' });
  });
};

// DELETE operation
exports.deletePago = (req, res) => {
  const { CodPago } = req.body;

  const sqlDelete = 'DELETE FROM PAGOS WHERE CodPago = ?';
  // se asume que se va a eliminar por el código 
  sql.query(connectionString, sqlDelete, [CodPago], (err, result) => {
    if (err) {
      console.error('Error al eliminar el pago', err);
      res.status(500).json({ message: 'Error al eliminar el pago' });
      return;
    }
    console.log('Pago eliminado con éxito', result);
    res.status(200).json({ message: 'Pago eliminado con éxito' });
  });
};
