const {sql, connectionString} = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getSucursal = (req, res) => {
  // Preparar la sentencia SQL para obtener todas las sucursales
  const sqlSelect = 'SELECT * FROM SUCURSALES';

  // Ejecutar la sentencia SQL
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener las sucursales', err);
      res.status(500).send('Error al obtener las sucursales');
      return;
    }
    console.log('Sucursales obtenidas con éxito', result);
    res.status(200).json(result);
  });
};


exports.createSucursal = (req, res) => {
  // Asumiendo que el cuerpo de la solicitud contiene los campos necesarios para insertar en la tabla SUCURSALES
  const { RIFSuc, NombreSuc, Ciudad, codigo } = req.body;

  // Preparar la sentencia SQL para insertar datos
  const sqlInsert = 'INSERT INTO SUCURSALES (RIFSuc, NombreSuc, Ciudad, codigo) VALUES (?, ?, ?, ?)';

  // Ejecutar la sentencia SQL
  sql.query(connectionString, sqlInsert, [RIFSuc, NombreSuc, Ciudad, codigo], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).send('Error al insertar en la base de datos');
      return;
    }
    console.log('Sucursal creada con éxito', result);
    res.status(201).send('Sucursal creada con éxito');
  });
};

// DELETE operation
exports.deleteSucursal = (req, res) => {
  // Aquí estamos asumiendo que el ID de la sucursal viene en el parámetro de la URL
  const  { RIFSuc } = req.body;
  
  // Preparar la sentencia SQL para eliminar la sucursal
  const sqlDelete = 'DELETE FROM SUCURSALES WHERE RIFSuc = ?';

  // Ejecutar la sentencia SQL
  sql.query(connectionString, sqlDelete, [RIFSuc], (err, result) => {
    if (err) {
      console.error('Error al eliminar la sucursal', err);
      res.status(500).send('Error al eliminar la sucursal');
      return;
    }
    console.log('Sucursal eliminada con éxito', result);
    res.status(200).send('Sucursal eliminada con éxito');
  });
  
};

// PUT operation
exports.updateSucursal = (req, res) => {
  // Assuming the request body contains the necessary fields to update in the SUCURSALES table
  const { RIFSuc, NombreSuc, Ciudad, codigo, Encargado, FechaInEnc } = req.body;

  // Prepare the SQL statement to update data
  const sqlUpdate = 'UPDATE SUCURSALES SET NombreSuc = ?, Ciudad = ?, codigo = ?, Encargado = ?, FechaInEnc = ? WHERE RIFSuc = ?';

  // Execute the SQL statement
  sql.query(connectionString, sqlUpdate, [NombreSuc, Ciudad, codigo, Encargado, FechaInEnc, RIFSuc], (err, result) => {
    if (err) {
      console.error('Error updating the branch', err);
      res.status(500).send('Error updating the branch');
      return;
    }
    console.log('Branch updated successfully', result);
    res.status(200).send('Branch updated successfully');
  });
};