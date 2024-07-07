const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getContratanActOrdensProdServ = (req, res) => {
  const sqlSelect = 'SELECT * FROM CONTRATAN_ACT_ORDENS_PROD_SERV';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener los registros de CONTRATAN_ACT_ORDENS_PROD_SERV', err);
      res.status(500).json({ message: 'Error al obtener los registros de CONTRATAN_ACT_ORDENS_PROD_SERV' });
      return;
    }
    console.log('Registros de CONTRATAN_ACT_ORDENS_PROD_SERV obtenidos con éxito', result);
    res.status(200).json(result);
  });
};

// POST operation
exports.createContratanActOrdensProdServ = (req, res) => {
  const { CodServicio, NroActividad, NroOrenServ, CodProductoServ, CantProd, Precio} = req.body;

  const sqlProcedure = `EXEC InsertarContratan @CodServicio = ?, @NroActividad = ?, @NroOrenServ = ?, @CodProductoServ = ?, @CantProd = ?;`;

  let responseSent = false;

  try{
    sql.query(connectionString, sqlProcedure, [CodServicio, NroActividad, NroOrenServ, CodProductoServ, CantProd], (err, result) => {
      if (!responseSent) {
        if (err) {
          console.error('Error al ejecutar el procedimiento almacenado', err);
          res.status(500).json({ message: 'Error al ejecutar el procedimiento almacenado' });
          responseSent = true;
          return;
        }
        console.log('Procedimiento almacenado ejecutado con éxito', result);
        res.status(200).json({ message: 'Procedimiento almacenado ejecutado con éxito' });
        responseSent = true;
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    if (!responseSent) {
      res.status(500).json({ message: 'Unexpected error occurred' });
      responseSent = true;
    }
  }
};

// DELETE operation
exports.deleteContratanActOrdensProdServ = (req, res) => {
  const { CodServicio, NroActividad, NroOrenServ, CodProductoServ } = req.body;

  const sqlDelete = 'DELETE FROM CONTRATAN_ACT_ORDENS_PROD_SERV WHERE CodServicio = ? AND NroActividad = ? AND NroOrenServ = ? AND CodProductoServ = ?';

  sql.query(connectionString, sqlDelete, [CodServicio, NroActividad, NroOrenServ, CodProductoServ], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro de CONTRATAN_ACT_ORDENS_PROD_SERV', err);
      res.status(500).json({ message: 'Error al eliminar el registro de CONTRATAN_ACT_ORDENS_PROD_SERV' });
      return;
    }
    console.log('Registro de CONTRATAN_ACT_ORDENS_PROD_SERV eliminado con éxito', result);
    res.status(200).json({ message: 'Registro de CONTRATAN_ACT_ORDENS_PROD_SERV eliminado con éxito' });
  });
};

// PUT operation
exports.updateContratanActOrdensProdServ = (req, res) => {
  const { CodServicio, NroActividad, NroOrenServ, CodProductoServ, CantProd, Precio} = req.body;

  const sqlUpdate = `UPDATE CONTRATAN_ACT_ORDENS_PROD_SERV SET 
                     CantProd = ?, Precio = ?
                     WHERE CodServicio = ? AND NroActividad = ? AND NroOrenServ = ? AND CodProductoServ = ?`;

  sql.query(connectionString, sqlUpdate, [CantProd, Precio, CodServicio, NroActividad, NroOrenServ, CodProductoServ], (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro de CONTRATAN_ACT_ORDENS_PROD_SERV', err);
      res.status(500).json({ message: 'Error al actualizar el registro de CONTRATAN_ACT_ORDENS_PROD_SERV' });
      return;
    }
    console.log('Registro de CONTRATAN_ACT_ORDENS_PROD_SERV actualizado con éxito', result);
    res.status(200).json({ message: 'Registro de CONTRATAN_ACT_ORDENS_PROD_SERV actualizado con éxito' });
  });
};
