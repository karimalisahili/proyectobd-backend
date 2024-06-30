const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getRegistranFactProd = (req, res) => {
  const sqlSelect = 'SELECT * FROM REGISTRAN_FACT_PROD';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener los registros de REGISTRAN_FACT_PROD', err);
      res.status(500).json({ message: 'Error al obtener los registros de REGISTRAN_FACT_PROD' });
      return;
    }
    console.log('Registros de REGISTRAN_FACT_PROD obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createRegistranFactProd = (req, res) => {
  const { NumFactTienda, CodProdTienda, CantComprada } = req.body;

  const sqlInsert = `INSERT INTO REGISTRAN_FACT_PROD 
                     (NumFactTienda, CodProdTienda, CantComprada) 
                     VALUES (?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [NumFactTienda, CodProdTienda, CantComprada], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Registro de REGISTRAN_FACT_PROD creado con éxito', result);
    res.status(201).json({ message: 'Registro de REGISTRAN_FACT_PROD creado con éxito' });
  });
};

// DELETE operation
exports.deleteRegistranFactProd = (req, res) => {
  const { NumFactTienda, CodProdTienda } = req.body;

  const sqlDelete = 'DELETE FROM REGISTRAN_FACT_PROD WHERE NumFactTienda = ? AND CodProdTienda = ?';

  sql.query(connectionString, sqlDelete, [NumFactTienda, CodProdTienda], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro de REGISTRAN_FACT_PROD', err);
      res.status(500).json({ message: 'Error al eliminar el registro de REGISTRAN_FACT_PROD' });
      return;
    }
    console.log('Registro de REGISTRAN_FACT_PROD eliminado con éxito', result);
    res.status(200).json({ message: 'Registro de REGISTRAN_FACT_PROD eliminado con éxito' });
  });
};

// PUT operation
exports.updateRegistranFactProd = (req, res) => {
  const { NumFactTienda, CodProdTienda, CantComprada } = req.body;

  const sqlUpdate = `UPDATE REGISTRAN_FACT_PROD SET 
                     CantComprada = ? 
                     WHERE NumFactTienda = ? AND CodProdTienda = ?`;

  sql.query(connectionString, sqlUpdate, [CantComprada, NumFactTienda, CodProdTienda], (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro de REGISTRAN_FACT_PROD', err);
      res.status(500).json({ message: 'Error al actualizar el registro de REGISTRAN_FACT_PROD' });
      return;
    }
    console.log('Registro de REGISTRAN_FACT_PROD actualizado con éxito', result);
    res.status(200).json({ message: 'Registro de REGISTRAN_FACT_PROD actualizado con éxito' });
  });
};
