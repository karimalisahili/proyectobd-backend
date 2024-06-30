const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getApartanResAct = (req, res) => {
  const sqlSelect = 'SELECT * FROM APARTAN_RES_ACT';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener los registros de APARTAN_RES_ACT', err);
      res.status(500).json({ message: 'Error al obtener los registros de APARTAN_RES_ACT' });
      return;
    }
    console.log('Registros de APARTAN_RES_ACT obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createApartanResAct = (req, res) => {
  const { NroReserva, CodServicio, NroActividad, FechaEjecucion } = req.body;

  const sqlInsert = `INSERT INTO APARTAN_RES_ACT 
                     (NroReserva, CodServicio, NroActividad, FechaEjecucion) 
                     VALUES (?, ?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [NroReserva, CodServicio, NroActividad, FechaEjecucion], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Registro de APARTAN_RES_ACT creado con éxito', result);
    res.status(201).json({ message: 'Registro de APARTAN_RES_ACT creado con éxito' });
  });
};

// DELETE operation
exports.deleteApartanResAct = (req, res) => {
  const { NroReserva, CodServicio, NroActividad } = req.body;

  const sqlDelete = 'DELETE FROM APARTAN_RES_ACT WHERE NroReserva = ? AND CodServicio = ? AND NroActividad = ?';

  sql.query(connectionString, sqlDelete, [NroReserva, CodServicio, NroActividad], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro de APARTAN_RES_ACT', err);
      res.status(500).json({ message: 'Error al eliminar el registro de APARTAN_RES_ACT' });
      return;
    }
    console.log('Registro de APARTAN_RES_ACT eliminado con éxito', result);
    res.status(200).json({ message: 'Registro de APARTAN_RES_ACT eliminado con éxito' });
  });
};

// PUT operation
exports.updateApartanResAct = (req, res) => {
  const { NroReserva, CodServicio, NroActividad, FechaEjecucion } = req.body;

  const sqlUpdate = `UPDATE APARTAN_RES_ACT SET 
                     FechaEjecucion = ? 
                     WHERE NroReserva = ? AND CodServicio = ? AND NroActividad = ?`;

  sql.query(connectionString, sqlUpdate, [FechaEjecucion, NroReserva, CodServicio, NroActividad], (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro de APARTAN_RES_ACT', err);
      res.status(500).json({ message: 'Error al actualizar el registro de APARTAN_RES_ACT' });
      return;
    }
    console.log('Registro de APARTAN_RES_ACT actualizado con éxito', result);
    res.status(200).json({ message: 'Registro de APARTAN_RES_ACT actualizado con éxito' });
  });
};
