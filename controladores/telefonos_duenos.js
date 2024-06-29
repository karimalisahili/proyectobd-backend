const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getTelefonosDuenos = (req, res) => {
  const sqlSelect = 'SELECT * FROM TELEFONOS_DUENOS';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener los registros de TELEFONOS_DUENOS', err);
      res.status(500).json({ message: 'Error al obtener los registros de TELEFONOS_DUENOS' });
      return;
    }
    console.log('Registros de TELEFONOS_DUENOS obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createTelefonoDueno = (req, res) => {
  const { CodVehiculo, NroTelefono } = req.body;

  const sqlInsert = `INSERT INTO TELEFONOS_DUENOS 
                     (CodVehiculo, NroTelefono) 
                     VALUES (?, ?)`;

  sql.query(connectionString, sqlInsert, [CodVehiculo, NroTelefono], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Registro de TELEFONOS_DUENOS creado con éxito', result);
    res.status(201).json({ message: 'Registro de TELEFONOS_DUENOS creado con éxito' });
  });
};

// DELETE operation
exports.deleteTelefonoDueno = (req, res) => {
  const { CodVehiculo, NroTelefono } = req.body;

  const sqlDelete = 'DELETE FROM TELEFONOS_DUENOS WHERE CodVehiculo = ? AND NroTelefono = ?';

  sql.query(connectionString, sqlDelete, [CodVehiculo, NroTelefono], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro de TELEFONOS_DUENOS', err);
      res.status(500).json({ message: 'Error al eliminar el registro de TELEFONOS_DUENOS' });
      return;
    }
    console.log('Registro de TELEFONOS_DUENOS eliminado con éxito', result);
    res.status(200).json({ message: 'Registro de TELEFONOS_DUENOS eliminado con éxito' });
  });
};

// PUT operation
exports.updateTelefonoDueno = (req, res) => {
  const { CodVehiculo, NroTelefono, newNroTelefono } = req.body;

  const sqlUpdate = `UPDATE TELEFONOS_DUENOS SET 
                     NroTelefono = ? 
                     WHERE CodVehiculo = ? AND NroTelefono = ?`;

  sql.query(connectionString, sqlUpdate, [newNroTelefono, CodVehiculo, NroTelefono], (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro de TELEFONOS_DUENOS', err);
      res.status(500).json({ message: 'Error al actualizar el registro de TELEFONOS_DUENOS' });
      return;
    }
    console.log('Registro de TELEFONOS_DUENOS actualizado con éxito', result);
    res.status(200).json({ message: 'Registro de TELEFONOS_DUENOS actualizado con éxito' });
  });
};
