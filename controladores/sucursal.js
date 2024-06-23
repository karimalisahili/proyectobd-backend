const {sql, connectionString} = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getSucursal = (req, res) => {
  // Aquí simplemente estamos enviando un objeto JSON de ejemplo
  res.json({ id: 1, nombre: 'Sucursal 1', ubicacion: 'Ubicación 1' });
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


};