const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getRecibenSucTipoV = (req, res) => {
  const sqlSelect = 'SELECT * FROM RECIBEN_SUC_TIPOV';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener los registros de RECIBEN_SUC_TIPOV', err);
      res.status(500).json({ message: 'Error al obtener los registros de RECIBEN_SUC_TIPOV' });
      return;
    }
    console.log('Registros de RECIBEN_SUC_TIPOV obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createRecibenSucTipoV = (req, res) => {
  const { RIFSucursal, CodTipoV } = req.body;

  const sqlInsert = `INSERT INTO RECIBEN_SUC_TIPOV 
                     (RIFSucursal, CodTipoV) 
                     VALUES (?, ?)`;

  sql.query(connectionString, sqlInsert, [RIFSucursal, CodTipoV], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Registro de RECIBEN_SUC_TIPOV creado con éxito', result);
    res.status(201).json({ message: 'Registro de RECIBEN_SUC_TIPOV creado con éxito' });
  });
};

// DELETE operation
exports.deleteRecibenSucTipoV = (req, res) => {
  const { RIFSucursal, CodTipoV } = req.body;

  const sqlDelete = 'DELETE FROM RECIBEN_SUC_TIPOV WHERE RIFSucursal = ? AND CodTipoV = ?';

  sql.query(connectionString, sqlDelete, [RIFSucursal, CodTipoV], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro de RECIBEN_SUC_TIPOV', err);
      res.status(500).json({ message: 'Error al eliminar el registro de RECIBEN_SUC_TIPOV' });
      return;
    }
    console.log('Registro de RECIBEN_SUC_TIPOV eliminado con éxito', result);
    res.status(200).json({ message: 'Registro de RECIBEN_SUC_TIPOV eliminado con éxito' });
  });
};
