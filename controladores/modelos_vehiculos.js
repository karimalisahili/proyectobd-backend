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

// POST operation
exports.createModeloVehiculo = (req, res) => {
    const { CodMarcaV, Descripcion, CantPuestos, Peso, TipoAceite, AceiteCaja, TipoRefri, Octanaje, TipoMant, TiempoUsoMant, KilometrajeMant, CodTipoV } = req.body;
  
    const sqlInsert = `INSERT INTO MODELOS_VEHICULOS 
                       (CodMarcaV, Descripcion, CantPuestos, Peso, TipoAceite, AceiteCaja, TipoRefri, Octanaje, TipoMant, TiempoUsoMant, KilometrajeMant, CodTipoV) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    sql.query(connectionString, sqlInsert, [CodMarcaV, Descripcion, CantPuestos, Peso, TipoAceite, AceiteCaja, TipoRefri, Octanaje, TipoMant, TiempoUsoMant, KilometrajeMant, CodTipoV], (err, result) => {
      if (err) {
        console.error('Error al insertar en la base de datos', err);
        res.status(500).send('Error al insertar en la base de datos');
        return;
      }
      console.log('Modelo de vehículo creado con éxito', result);
      res.status(201).send('Modelo de vehículo creado con éxito');
    });
  };

  // DELETE operation
exports.deleteModeloVehiculo = (req, res) => {
    const { CodMarcaV, CodConsec } = req.body;
  
    const sqlDelete = 'DELETE FROM MODELOS_VEHICULOS WHERE CodMarcaV = ? AND CodConsec = ?';
  
    sql.query(connectionString, sqlDelete, [CodMarcaV, CodConsec], (err, result) => {
      if (err) {
        console.error('Error al eliminar el modelo de vehículo', err);
        res.status(500).send('Error al eliminar el modelo de vehículo');
        return;
      }
      console.log('Modelo de vehículo eliminado con éxito', result);
      res.status(200).send('Modelo de vehículo eliminado con éxito');
    });
  };



  // PUT operation
exports.updateModeloVehiculo = (req, res) => {
    const { CodMarcaV, CodConsec, Descripcion, CantPuestos, Peso, TipoAceite, AceiteCaja, TipoRefri, Octanaje, TipoMant, TiempoUsoMant, KilometrajeMant, CodTipoV } = req.body;
  
    const sqlUpdate = `UPDATE MODELOS_VEHICULOS SET 
                       Descripcion = ?, CantPuestos = ?, Peso = ?, TipoAceite = ?, AceiteCaja = ?, TipoRefri = ?, Octanaje = ?, TipoMant = ?, TiempoUsoMant = ?, KilometrajeMant = ?, CodTipoV = ?
                       WHERE CodMarcaV = ? AND CodConsec = ?`;
  
    sql.query(connectionString, sqlUpdate, [Descripcion, CantPuestos, Peso, TipoAceite, AceiteCaja, TipoRefri, Octanaje, TipoMant, TiempoUsoMant, KilometrajeMant, CodTipoV, CodMarcaV, CodConsec], (err, result) => {
      if (err) {
        console.error('Error al actualizar el modelo de vehículo', err);
        res.status(500).send('Error al actualizar el modelo de vehículo');
        return;
      }
      console.log('Modelo de vehículo actualizado con éxito', result);
      res.status(200).send('Modelo de vehículo actualizado con éxito');
    });
  };