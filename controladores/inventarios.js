const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getInventarios = (req, res) => {
  const sqlSelect = 'SELECT * FROM INVENTARIOS';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener los inventarios', err);
      res.status(500).json({ message: 'Error al obtener los inventarios' });
      return;
    }
    console.log('Inventarios obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createInventario = (req, res) => {
  const { RIFSuc, FechaRealiz, CodProducto, FechaHoraAjust, TipoAjuste, ExistAjustada, ExistReal, ExistTeorica } = req.body;

  const sqlInsert = `INSERT INTO INVENTARIOS 
                     (RIFSuc, FechaRealiz, CodProducto, FechaHoraAjust, TipoAjuste, ExistAjustada, ExistReal, ExistTeorica) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  sql.query(connectionString, sqlInsert, [RIFSuc, FechaRealiz, CodProducto, FechaHoraAjust, TipoAjuste, ExistAjustada, ExistReal, ExistTeorica], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos', err);
      res.status(500).json({ message: 'Error al insertar en la base de datos' });
      return;
    }
    console.log('Inventario creado con éxito', result);
    res.status(201).json({ message: 'Inventario creado con éxito' });
  });
};

// DELETE operation
exports.deleteInventario = (req, res) => {
  const { RIFSuc, NumInventario } = req.body;

  const sqlDelete = 'DELETE FROM INVENTARIOS WHERE RIFSuc = ? AND NumInventario = ?';

  sql.query(connectionString, sqlDelete, [RIFSuc, NumInventario], (err, result) => {
    if (err) {
      console.error('Error al eliminar el inventario', err);
      res.status(500).json({ message: 'Error al eliminar el inventario' });
      return;
    }
    console.log('Inventario eliminado con éxito', result);
    res.status(200).json({ message: 'Inventario eliminado con éxito' });
  });
};

// PUT operation
exports.updateInventario = (req, res) => {
  const { RIFSuc, NumInventario, FechaRealiz, CodProducto, FechaHoraAjust, TipoAjuste, ExistAjustada, ExistReal, ExistTeorica } = req.body;

  const sqlUpdate = `UPDATE INVENTARIOS SET 
                     FechaRealiz = ?, CodProducto = ?, FechaHoraAjust = ?, TipoAjuste = ?, ExistAjustada = ?, ExistReal = ?, ExistTeorica = ? 
                     WHERE RIFSuc = ? AND NumInventario = ?`;

  sql.query(connectionString, sqlUpdate, [FechaRealiz, CodProducto, FechaHoraAjust, TipoAjuste, ExistAjustada, ExistReal, ExistTeorica, RIFSuc, NumInventario], (err, result) => {
    if (err) {
      console.error('Error al actualizar el inventario', err);
      res.status(500).json({ message: 'Error al actualizar el inventario' });
      return;
    }
    console.log('Inventario actualizado con éxito', result);
    res.status(200).json({ message: 'Inventario actualizado con éxito' });
  });
};
