const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getModelosVehiculos = (req, res) => {
  const sqlSelect = 'SELECT * FROM MODELOS_VEHICULOS';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener los modelos de vehículos', err);
      res.status(500).send('Error al obtener los modelos de vehículos');
      return;
    }
    console.log('Modelos de vehículos obtenidos con éxito', result);
    res.status(200).json(result);
  });
};