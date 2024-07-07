const {sql, connectionString} = require('../config'); // Asegúrate de que la ruta sea correcta

// GET function Consulta Obetener Marca de vehículos que más atendemos por tipo de servicio.

exports.getMarcasServicios = (req, res) => {
    const sqlSelect = 'SELECT * from V_Est_Marcas_Servicios';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.error('Error al obtener la consulta', err);
            res.status(500).send('Error al obtener la consulta');
            return;
        }
        console.log('consulta obtenida con éxito', result);
        res.status(200).json(result);
    });
}



// GET operation Personal que realiza más servicios por mes.
exports.getEmpleadosMasServicios = (req, res) => {
    const Anio = req.params.Anio;
    const Mes = req.params.Mes;
    //console.log(RIFSuc)
    console.log(Anio,Mes);

  // Preparar la sentencia SQL para obtener todas las trabajadores
  const sqlSelect = 'SELECT CIEmpleado, NombreEmpleado, cantidad FROM V_PersonalMasServiciosPorMes WHERE Anio = ? and Mes = ?';

  // Ejecutar la sentencia SQL
  sql.query(connectionString, sqlSelect,[Anio,Mes], (err, result) => {
    if (err) {
      console.error('Error al obtener la consulta', err);
      res.status(500).send('Error al obtener la consulta');
      return;
    }
    console.log('Consulta obtenidas con éxito', result);
    res.status(200).json(result);
  });
};


// GET operation Personal que realiza menos servicios por mes.
exports.getEmpleadosMenosServicios = (req, res) => {
    const Anio = req.params.Anio;
    const Mes = req.params.Mes;
    //console.log(RIFSuc)
    console.log(Anio,Mes);

  // Preparar la sentencia SQL para obtener todas las trabajadores
  const sqlSelect = 'SELECT CIEmpleado, NombreEmpleado, Cantidad FROM V_PersonalMenosServiciosPorMes WHERE Anio = ? and Mes = ?';

  // Ejecutar la sentencia SQL
  sql.query(connectionString, sqlSelect,[Anio,Mes], (err, result) => {
    if (err) {
      console.error('Error al obtener la consulta', err);
      res.status(500).send('Error al obtener la consulta');
      return;
    }
    console.log('Consulta obtenidas con éxito', result);
    res.status(200).json(result);
  });
};