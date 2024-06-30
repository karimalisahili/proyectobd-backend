const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getDescuentos = (req, res) => {

  const RIFSuc = req.params.RIFSuc;
  console.log(RIFSuc);

  const sqlSelect = 'SELECT * FROM DESCUENTOS WHERE RIFSuc = ?';

  sql.query(connectionString, sqlSelect, [RIFSuc], (err, result) => {
    if (err) {
      console.error('Error al obtener los descuentos', err);
      res.status(500).json({ message: 'Error al obtener los descuentos' });
      return;
    }
    console.log('Descuentos obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createDescuento = (req, res) => {
  const { RIFSuc, LimiteInfe, LimiteSup, PorcentajeDesc } = req.body;

  const sqlInsert = `INSERT INTO DESCUENTOS 
                     (RIFSuc, LimiteInfe, LimiteSup, PorcentajeDesc) 
                     VALUES (?, ?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [RIFSuc, LimiteInfe, LimiteSup, PorcentajeDesc], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Descuento creado con éxito', result);
    res.status(201).json({ message: 'Descuento creado con éxito' });
  });
};

// DELETE operation
exports.deleteDescuento = (req, res) => {
  const { RIFSuc, NroDesc } = req.body;

  const sqlDelete = 'DELETE FROM DESCUENTOS WHERE RIFSuc = ? AND NroDesc = ?';

  sql.query(connectionString, sqlDelete, [RIFSuc, NroDesc], (err, result) => {
    if (err) {
      console.error('Error al eliminar el descuento', err);
      res.status(500).json({ message: 'Error al eliminar el descuento' });
      return;
    }
    console.log('Descuento eliminado con éxito', result);
    res.status(200).json({ message: 'Descuento eliminado con éxito' });
  });
};

// PUT operation
exports.updateDescuento = (req, res) => {
  const { RIFSuc, NroDesc, LimiteInfe, LimiteSup, PorcentajeDesc } = req.body;

  const sqlUpdate = `UPDATE DESCUENTOS SET 
                     LimiteInfe = ?, LimiteSup = ?, PorcentajeDesc = ? 
                     WHERE RIFSuc = ? AND NroDesc = ?`;

  sql.query(connectionString, sqlUpdate, [LimiteInfe, LimiteSup, PorcentajeDesc, RIFSuc, NroDesc], (err, result) => {
    if (err) {
      console.error('Error al actualizar el descuento', err);
      res.status(500).json({ message: 'Error al actualizar el descuento' });
      return;
    }
    console.log('Descuento actualizado con éxito', result);
    res.status(200).json({ message: 'Descuento actualizado con éxito' });
  });
};
