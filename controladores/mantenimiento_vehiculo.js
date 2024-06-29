const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getMantenimientoVehiculo = (req, res) => {
  const sqlSelect = 'SELECT * FROM MANTENIMIENTO_VEHICULO';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener los registros de MANTENIMIENTO_VEHICULO', err);
      res.status(500).json({ message: 'Error al obtener los registros de MANTENIMIENTO_VEHICULO' });
      return;
    }
    console.log('Registros de MANTENIMIENTO_VEHICULO obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createMantenimientoVehiculo = (req, res) => {
  const { CodVehiculo, FechaMant, Descripcion } = req.body;

  const sqlInsert = `INSERT INTO MANTENIMIENTO_VEHICULO 
                     (CodVehiculo, FechaMant, Descripcion) 
                     VALUES (?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [CodVehiculo, FechaMant, Descripcion], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Registro de MANTENIMIENTO_VEHICULO creado con éxito', result);
    res.status(201).json({ message: 'Registro de MANTENIMIENTO_VEHICULO creado con éxito' });
  });
};

// DELETE operation
exports.deleteMantenimientoVehiculo = (req, res) => {
  const { CodVehiculo, FechaMant, Descripcion } = req.body;

  const sqlDelete = 'DELETE FROM MANTENIMIENTO_VEHICULO WHERE CodVehiculo = ? AND FechaMant = ? AND Descripcion = ?';

  sql.query(connectionString, sqlDelete, [CodVehiculo, FechaMant, Descripcion], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro de MANTENIMIENTO_VEHICULO', err);
      res.status(500).json({ message: 'Error al eliminar el registro de MANTENIMIENTO_VEHICULO' });
      return;
    }
    console.log('Registro de MANTENIMIENTO_VEHICULO eliminado con éxito', result);
    res.status(200).json({ message: 'Registro de MANTENIMIENTO_VEHICULO eliminado con éxito' });
  });
};

// PUT operation
exports.updateMantenimientoVehiculo = (req, res) => {
  const { CodVehiculo, FechaMant, Descripcion, newFechaMant, newDescripcion } = req.body;

  const sqlUpdate = `UPDATE MANTENIMIENTO_VEHICULO SET 
                     FechaMant = ?, Descripcion = ? 
                     WHERE CodVehiculo = ? AND FechaMant = ? AND Descripcion = ?`;

  sql.query(connectionString, sqlUpdate, [newFechaMant, newDescripcion, CodVehiculo, FechaMant, Descripcion], (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro de MANTENIMIENTO_VEHICULO', err);
      res.status(500).json({ message: 'Error al actualizar el registro de MANTENIMIENTO_VEHICULO' });
      return;
    }
    console.log('Registro de MANTENIMIENTO_VEHICULO actualizado con éxito', result);
    res.status(200).json({ message: 'Registro de MANTENIMIENTO_VEHICULO actualizado con éxito' });
  });
};
