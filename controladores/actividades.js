const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getActividades = (req, res) => {
  const sqlSelect = 'SELECT * FROM ACTIVIDADES';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener las actividades', err);
      res.status(500).json({ message: 'Error al obtener las actividades' });
      return;
    }
    console.log('Actividades obtenidas con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createActividad = (req, res) => {
  const { CodServicio, Descripcion, Monto, AntelacionReserva, rifSucursal, capacidad } = req.body;

  const sqlInsert = `INSERT INTO ACTIVIDADES 
                     (CodServicio, Descripcion, Monto, AntelacionReserva, rifSucursal, capacidad) 
                     VALUES (?, ?, ?, ?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [CodServicio, Descripcion, Monto, AntelacionReserva, rifSucursal, capacidad], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Actividad creada con éxito', result);
    res.status(201).json({ message: 'Actividad creada con éxito' });
  });
};

// DELETE operation
exports.deleteActividad = (req, res) => {
  const { CodServicio, NroActividad } = req.body;

  const sqlDelete = 'DELETE FROM ACTIVIDADES WHERE CodServicio = ? AND NroActividad = ?';

  sql.query(connectionString, sqlDelete, [CodServicio, NroActividad], (err, result) => {
    if (err) {
      console.error('Error al eliminar la actividad', err);
      res.status(500).json({ message: 'Error al eliminar la actividad' });
      return;
    }
    console.log('Actividad eliminada con éxito', result);
    res.status(200).json({ message: 'Actividad eliminada con éxito' });
  });
};

// PUT operation
exports.updateActividad = (req, res) => {
  const { CodServicio, NroActividad, Descripcion, Monto, AntelacionReserva, rifSucursal, capacidad } = req.body;

  const sqlUpdate = `UPDATE ACTIVIDADES SET 
                     Descripcion = ?, Monto = ?, AntelacionReserva = ?, rifSucursal = ?, capacidad = ? 
                     WHERE CodServicio = ? AND NroActividad = ?`;

  sql.query(connectionString, sqlUpdate, [Descripcion, Monto, AntelacionReserva, rifSucursal, capacidad, CodServicio, NroActividad], (err, result) => {
    if (err) {
      console.error('Error al actualizar la actividad', err);
      res.status(500).json({ message: 'Error al actualizar la actividad' });
      return;
    }
    console.log('Actividad actualizada con éxito', result);
    res.status(200).json({ message: 'Actividad actualizada con éxito' });
  });
};
