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

// GETS para la informacion para imprimir la factura
exports.getDatosOrdenServicio = (req, res) => {
  const { nroOrden } = req.params; // Assuming nroOrden is passed as a URL parameter

  const sqlProcedureCall = 'EXECUTE ObtenerDatosOrdenServicio @NroOrdenServicio = ?';

  sql.query(connectionString, sqlProcedureCall, [nroOrden], (err, result) => {
    if (err) {
      console.error('Error al obtener los datos de la orden de servicio', err);
      res.status(500).json({ message: 'Error al obtener los datos de la orden de servicio' });
      return;
    }
    console.log('Datos de la orden de servicio obtenidos con éxito', result);
    res.status(200).json(result);
  });
};


exports.getDatosServicios = (req, res) => {
  const { nroOrden } = req.params; 

  const sqlProcedureCall = 'EXECUTE ObtenerServiciosOrdenServicio @NroOrdenServicio = ?';

  sql.query(connectionString, sqlProcedureCall, [nroOrden], (err, result) => {
    if (err) {
      console.error('Error al obtener los datos de los servicios', err);
      res.status(500).json({ message: 'Error al obtener los datos de los servicios' });
      return;
    }
    console.log('Datos de los servicios obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

exports.getDatosActividades = (req, res) => {
  const { nroOrden } = req.params; 

  const sqlProcedureCall = 'EXECUTE ObtenerActividadesOrdenServicio @NroOrdenServicio = ?';

  sql.query(connectionString, sqlProcedureCall, [nroOrden], (err, result) => {
    if (err) {
      console.error('Error al obtener los datos de las actividades', err);
      res.status(500).json({ message: 'Error al obtener los datos de las actividades' });
      return;
    }
    console.log('Datos de las actividades obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

exports.getDatosProductos = (req, res) => {
  const { nroOrden } = req.params; 

  const sqlProcedureCall = 'EXECUTE ObtenerProductosOrdenServicio @NroOrdenServicio = ?';

  sql.query(connectionString, sqlProcedureCall, [nroOrden], (err, result) => {
    if (err) {
      console.error('Error al obtener los datos de los productos', err);
      res.status(500).json({ message: 'Error al obtener los datos de los productos' });
      return;
    }
    console.log('Datos de los productos obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

exports.getDatosDescuento = (req, res) => {
  const { nroOrden } = req.params; 

  const sqlProcedureCall = 'EXECUTE ObtenerDescuentoPorOrdenServicio @NroOrdenServicio = ?';

  sql.query(connectionString, sqlProcedureCall, [nroOrden], (err, result) => {
    if (err) {
      console.error('Error al obtener los datos del descuento', err);
      res.status(500).json({ message: 'Error al obtener los datos del descuento' });
      return;
    }
    console.log('Datos del descuento obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

exports.getDatoMontoTotal = (req, res) => {
  const { nroOrden } = req.params; 

  const sqlProcedureCall = 'EXECUTE ObtenerTotalAPagarPorOrdenServicio @NroOrdenServicio = ?';

  sql.query(connectionString, sqlProcedureCall, [nroOrden], (err, result) => {
    if (err) {
      console.error('Error al obtener el monto total', err);
      res.status(500).json({ message: 'Error al obtener el monto total' });
      return;
    }
    console.log('Monto total obtenido con éxito', result);
    res.status(200).json(result);
  });
}

// POST operation
exports.createFacturaServicio = (req, res) => {
  const { CodOrd, Fecha, Monto, Descuento } = req.body;

  const sqlInsert = `INSERT INTO FACTURAS_SERVICIOS 
                     (CodOrd, Fecha, Monto, Descuento) 
                     VALUES (?,?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [CodOrd, Fecha, Monto, Descuento], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Registro de FACTURAS_SERVICIOS creado con éxito', result);
    res.status(200).json({ message: 'Registro de FACTURAS_SERVICIOS creado con éxito' });
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
