const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getAutorizados = (req, res) => {
  const sqlSelect = 'SELECT * FROM AUTORIZADOS';
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener los autorizados', err);
      res.status(500).json('Error al obtener los autorizados');
      return;
    }
    res.status(200).json(result);
  });
};

// POST operation
exports.createAutorizado = (req, res) => {
    const { CIAutorizado, NombreAutorizado } = req.body;
  
    const sqlInsert = 'INSERT INTO AUTORIZADOS (CIAutorizado, NombreAutorizado) VALUES (?, ?)';
  
    sql.query(connectionString, sqlInsert, [CIAutorizado, NombreAutorizado], (err, result) => {
      if (err) {
        console.error('Error al insertar en la base de datos', err);
        res.status(500).json('Error al insertar en la base de datos');
        return;
      }
      res.status(200).json('Autorizado creado con éxito');
    });
  };
  
  // DELETE operation
  exports.deleteAutorizado = (req, res) => {
    const { CIAutorizado } = req.body;
  
    const sqlDelete = 'DELETE FROM AUTORIZADOS WHERE CIAutorizado = ?';
  
    sql.query(connectionString, sqlDelete, [CIAutorizado], (err, result) => {
      if (err) {
        console.error('Error al eliminar el autorizado', err);
        res.status(500).json('Error al eliminar el autorizado');
        return;
      }
      res.status(200).json('Autorizado eliminado con éxito');
    });
  };
  
  // PUT operation
  exports.updateAutorizado = (req, res) => {
    const { CIAutorizado, NombreAutorizado } = req.body;
  
    const sqlUpdate = 'UPDATE AUTORIZADOS SET NombreAutorizado = ? WHERE CIAutorizado = ?';
  
    sql.query(connectionString, sqlUpdate, [NombreAutorizado, CIAutorizado], (err, result) => {
      if (err) {
        console.error('Error al actualizar el autorizado', err);
        res.status(500).json('Error al actualizar el autorizado');
        return;
      }
      console.log('Autorizado actualizado con éxito', result);
      res.status(200).json('Autorizado actualizado con éxito');
    });
  };