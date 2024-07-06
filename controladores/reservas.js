const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getReservas = (req, res) => {
  const sqlSelect = 'SELECT * FROM RESERVAS';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener las reservas', err);
      res.status(500).json({ message: 'Error al obtener las reservas' });
      return;
    }
    console.log('Reservas obtenidas con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createReserva = (req, res) => {
  const {NroR, FechaR, Abono, CodVehiculo } = req.body;

  const sqlInsert = `INSERT INTO RESERVAS 
                     (FechaR, Abono, CodVehiculo) 
                     VALUES (?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [FechaR, Abono, CodVehiculo], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Reserva creada con éxito', result);
    res.status(200).json({ message: 'Reserva creada con éxito' });
  });
};

// DELETE operation
exports.deleteReserva = (req, res) => {
  const { NroR } = req.body;

  const sqlDelete = 'DELETE FROM RESERVAS WHERE NroR = ?';

  sql.query(connectionString, sqlDelete, [NroR], (err, result) => {
    if (err) {
      console.error('Error al eliminar la reserva', err);
      res.status(500).json({ message: 'Error al eliminar la reserva' });
      return;
    }
    console.log('Reserva eliminada con éxito', result);
    res.status(200).json({ message: 'Reserva eliminada con éxito' });
  });
};

// PUT operation
exports.updateReserva = (req, res) => {
  const { NroR, FechaR, Abono, CodVehiculo } = req.body;

  const sqlUpdate = `UPDATE RESERVAS SET 
                     FechaR = ?, Abono = ?, CodVehiculo = ? 
                     WHERE NroR = ?`;

  sql.query(connectionString, sqlUpdate, [FechaR, Abono, CodVehiculo, NroR], (err, result) => {
    if (err) {
      console.error('Error al actualizar la reserva', err);
      res.status(500).json({ message: 'Error al actualizar la reserva' });
      return;
    }
    console.log('Reserva actualizada con éxito', result);
    res.status(200).json({ message: 'Reserva actualizada con éxito' });
  });
};
