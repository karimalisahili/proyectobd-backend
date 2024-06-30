const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getDistribuyen = (req, res) => {
  const sqlSelect = 'SELECT * FROM DISTRIBUYEN';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener los registros de distribuyen', err);
      res.status(500).json({ message: 'Error al obtener los registros de distribuyen' });
      return;
    }
    console.log('Registros de distribuyen obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createDistribuyen = (req, res) => {
  const { RIFProveedor, CodLinea } = req.body;

  const sqlInsert = `INSERT INTO DISTRIBUYEN 
                     (RIFProveedor, CodLinea) 
                     VALUES (?, ?)`;

  sql.query(connectionString, sqlInsert, [RIFProveedor, CodLinea], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Registro de distribuyen creado con éxito', result);
    res.status(201).json({ message: 'Registro de distribuyen creado con éxito' });
  });
};

// DELETE operation
exports.deleteDistribuyen = (req, res) => {
  const { RIFProveedor, CodLinea } = req.body;

  const sqlDelete = 'DELETE FROM DISTRIBUYEN WHERE RIFProveedor = ? AND CodLinea = ?';

  sql.query(connectionString, sqlDelete, [RIFProveedor, CodLinea], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro de distribuyen', err);
      res.status(500).json({ message: 'Error al eliminar el registro de distribuyen' });
      return;
    }
    console.log('Registro de distribuyen eliminado con éxito', result);
    res.status(200).json({ message: 'Registro de distribuyen eliminado con éxito' });
  });
};


