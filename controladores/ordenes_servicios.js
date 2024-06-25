const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getOrdenesServicios = (req, res) => {
  const sqlSelect = 'SELECT * FROM ORDENES_SERVICIOS';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener las órdenes de servicios', err);
      res.status(500).send('Error al obtener las órdenes de servicios');
      return;
    }
    console.log('Órdenes de servicios obtenidas con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createOrdenServicio = (req, res) => {
  const { Nombre, FechaHoraE, FechaHoraSEstimada, CIAutorizado, NumFacturaServ, CodVehiculo, CIEmpleado } = req.body;

  const sqlInsert = `INSERT INTO ORDENES_SERVICIOS 
                     (Nombre, FechaHoraE, FechaHoraSEstimada, CIAutorizado, NumFacturaServ, CodVehiculo, CIEmpleado) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [Nombre, FechaHoraE, FechaHoraSEstimada, CIAutorizado, NumFacturaServ, CodVehiculo, CIEmpleado], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).send('Error al insertar en la base de datos');
      return;
    }
    console.log('Orden de servicio creada con éxito', result);
    res.status(201).send('Orden de servicio creada con éxito');
  });
};

// DELETE operation
exports.deleteOrdenServicio = (req, res) => {
  const { Nro } = req.body;

  const sqlDelete = 'DELETE FROM ORDENES_SERVICIOS WHERE Nro = ?';

  sql.query(connectionString, sqlDelete, [Nro], (err, result) => {
    if (err) {
      console.error('Error al eliminar la orden de servicio', err);
      res.status(500).send('Error al eliminar la orden de servicio');
      return;
    }
    console.log('Orden de servicio eliminada con éxito', result);
    res.status(200).send('Orden de servicio eliminada con éxito');
  });
};

// PUT operation
exports.updateOrdenServicio = (req, res) => {
  const { Nro, Nombre, FechaHoraE, FechaHoraSEstimada, CIAutorizado, NumFacturaServ, CodVehiculo, CIEmpleado } = req.body;

  const sqlUpdate = `UPDATE ORDENES_SERVICIOS SET 
                     Nombre = ?, FechaHoraE = ?, FechaHoraSEstimada = ?, CIAutorizado = ?, NumFacturaServ = ?, CodVehiculo = ?, CIEmpleado = ?
                     WHERE Nro = ?`;

  sql.query(connectionString, sqlUpdate, [Nombre, FechaHoraE, FechaHoraSEstimada, CIAutorizado, NumFacturaServ, CodVehiculo, CIEmpleado, Nro], (err, result) => {
    if (err) {
      console.error('Error al actualizar la orden de servicio', err);
      res.status(500).send('Error al actualizar la orden de servicio');
      return;
    }
    console.log('Orden de servicio actualizada con éxito', result);
    res.status(200).send('Orden de servicio actualizada con éxito');
  });
};
