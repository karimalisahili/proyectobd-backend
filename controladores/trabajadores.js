const {sql, connectionString} = require('../config'); // Asegúrate de que la ruta sea correcta

// GET operation
exports.getTrabajadores = (req, res) => {
  // Preparar la sentencia SQL para obtener todas las trabajadores
  const sqlSelect = 'SELECT * FROM TRABAJADORES';

  // Ejecutar la sentencia SQL
  sql.query(connectionString, sqlSelect, (err, result) => {
    if (err) {
      console.error('Error al obtener las trabajadores', err);
      res.status(500).send('Error al obtener las trabajadores');
      return;
    }
    console.log('trabajadores obtenidas con éxito', result);
    res.status(200).json(result);
  });
};

exports.createTrabajadores = (req, res) => {
    // Preparar la sentencia SQL para crear un nuevo trabajador
    const sqlInsert = `INSERT INTO TRABAJADORES (Cedula, Nombre, Direccion, Salario, Telefono, RIFSuc) 
                                         VALUES (?, ?, ?, ?, ?, ?)`;
    
    // Obtener los datos del nuevo trabajador desde el cuerpo de la solicitud
    const { Cedula, Nombre, Direccion, Salario, Telefono, RIFSuc } = req.body;

    // Ejecutar la sentencia SQL con los datos del nuevo trabajador
    sql.query(connectionString, sqlInsert, [Cedula, Nombre, Direccion, Salario, Telefono, RIFSuc], (err, result) => {
        if (err) {
            console.error('Error al crear el trabajador', err);
            res.status(500).send('Error al crear el trabajador');
            return;
        }
        console.log('Trabajador creado con éxito');
        res.status(201).send('Trabajador creado con éxito');
    });
};

exports.deleteTrabajadores = (req, res) => {
    // Preparar la sentencia SQL para eliminar un trabajador por su cédula
    const sqlDelete = 'DELETE FROM TRABAJADORES WHERE Cedula = ?';

    // Obtener la cédula del trabajador a eliminar desde los parámetros de la solicitud
    const {Cedula} = req.body;

    // Ejecutar la sentencia SQL con la cédula del trabajador a eliminar
    sql.query(connectionString, sqlDelete, [Cedula], (err, result) => {
        if (err) {
            console.error('Error al eliminar el trabajador', err);
            res.status(500).send('Error al eliminar el trabajador');
            return;
        }
        console.log('Trabajador eliminado con éxito');
        res.status(200).send('Trabajador eliminado con éxito');
    });
};

exports.updateTrabajadores = (req, res) => {
    // Preparar la sentencia SQL para actualizar los datos de un trabajador por su cédula
    const sqlUpdate = `UPDATE TRABAJADORES 
                       SET Nombre = ?, Direccion = ?, Salario = ?, Telefono = ?, RIFSuc = ? 
                       WHERE Cedula = ?`;

    // Obtener los nuevos datos del trabajador desde el cuerpo de la solicitud
    const { Cedula, Nombre, Direccion, Salario, Telefono, RIFSuc } = req.body;

    // Corregir el typo en "Telefono" según el objeto JSON del error
    // Asegurarse de que todos los parámetros están siendo pasados en el tipo correcto, especialmente el Salario que debe ser un número
    // Ejecutar la sentencia SQL con los nuevos datos del trabajador
    sql.query(connectionString, sqlUpdate, [Nombre, Direccion, Salario, Telefono, RIFSuc, Cedula], (err, result) => {
        if (err) {
            console.error('Error al actualizar el trabajador', err);
            res.status(500).send('Error al actualizar el trabajador');
            return;
        }
        console.log('Trabajador actualizado con éxito');
        res.status(200).send('Trabajador actualizado con éxito');
    });
};