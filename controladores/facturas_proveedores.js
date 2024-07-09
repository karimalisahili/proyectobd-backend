const {sql, connectionString} = require('../config'); 

//Get operation
exports.getFacturaProveedor = (req, res) => {
    // Obtener el RIFSuc del parámetro de la ruta
    const { RIFSuc } = req.params;

    // Modificar la consulta SQL para hacer un JOIN entre FACTURAS_PROVEEDORES y FACTURAS_PROVEEDORES_ORDENES_COMPRAS
    // y filtrar por RIFSuc
    const sqlSelect = `
        SELECT DISTINCT fp.* 
        FROM FACTURAS_PROVEEDORES fp
        JOIN FACTURAS_PROVEEDORES_ORDENES_COMPRAS fpo
        ON fp.NumFact = fpo.NumFact
        WHERE fpo.RIFSuc = ?`;

    // Ejecutar la consulta SQL pasando el RIFSuc como parámetro
    sql.query(connectionString, sqlSelect, [RIFSuc], (err, result) => {
        if (err) {
            console.error('Error al obtener Facturas Proveedores', err);
            res.status(500).send('Error al obtener las Facturas Proveedores');
            return;
        }
        console.log('Facturas_Proveedores obtenido con éxito', result);
        res.status(200).json(result);
    });
};
// Post operation

exports.createFacturaProveedor = (req, res) => {
  const { RIFSuc, NumFact, Fecha, items } = req.body;

  // Variable para almacenar el total acumulado
  let totalMonto = 0;

  // Consulta SQL para insertar en FACTURAS_PROVEEDORES
  const sqlInsertFactura = `INSERT INTO FACTURAS_PROVEEDORES (NumFact, Monto, Fecha)
                            VALUES (?, ?, ?)`;

  // Consulta SQL para insertar en FACTURAS_PROVEEDORES_ORDENES_COMPRAS
  const sqlInsertDetalle = `INSERT INTO FACTURAS_PROVEEDORES_ORDENES_COMPRAS 
                            (NumFact, RIFSuc, CodOrden, CodRequiCom, CodProd)
                            VALUES (?, ?, ?, ?, ?)`;

  // Iterar sobre cada item y acumular el monto total
  Promise.all(items.map(item =>
    new Promise((resolve, reject) => {
      // Consulta SQL para obtener el monto total por cada item
      const sqlQuery = `
        SELECT Precio * CantProd AS MontoItem
        FROM ORDENES_COMPRAS OC
        INNER JOIN REQUISICIONES_COMPRA RC ON OC.CodRequiCom = RC.IdReq AND OC.CodProd = RC.CodProd AND OC.RIFSuc = RC.RIFSuc
        WHERE OC.RIFSuc = ? AND OC.CodOrden = ? AND OC.CodRequiCom = ? AND OC.CodProd = ?
      `;

      // Ejecutar la consulta SQL para obtener el monto por item
      sql.query(connectionString, sqlQuery, [RIFSuc, item.CodOrden, item.CodRequiCom, item.CodProd], (err, result) => {
        if (err) {
          console.error('Error al obtener el monto por item', err);
          reject(err);
        } else {
          // Sumar el monto total obtenido
          const montoItem = result[0].MontoItem || 0;
          totalMonto += montoItem;

          resolve({ CodOrden: item.CodOrden, CodRequiCom: item.CodRequiCom, CodProd: item.CodProd, MontoItem: montoItem });
        }
      });
    })
  ))
  .then(detalles => {
    // Insertar en FACTURAS_PROVEEDORES una vez calculado el total
    sql.query(connectionString, sqlInsertFactura, [NumFact, totalMonto, Fecha], (err, result) => {
      if (err) {
        console.error('Error al insertar en FACTURAS_PROVEEDORES', err);
        res.status(500).json({ message: 'Error al insertar en FACTURAS_PROVEEDORES' });
      } else {
        console.log('Factura de proveedor creada con éxito');

        // Insertar en FACTURAS_PROVEEDORES_ORDENES_COMPRAS
        const insertPromises = detalles.map(detalle =>
          new Promise((resolve, reject) => {
            sql.query(connectionString, sqlInsertDetalle, [NumFact, RIFSuc, detalle.CodOrden, detalle.CodRequiCom, detalle.CodProd], (err, result) => {
              if (err) {
                console.error('Error al insertar en FACTURAS_PROVEEDORES_ORDENES_COMPRAS', err);
                reject(err);
              } else {
                resolve();
              }
            });
          })
        );

        // Ejecutar todas las inserciones en FACTURAS_PROVEEDORES_ORDENES_COMPRAS
        Promise.all(insertPromises)
          .then(() => {
            res.status(201).json({
              message: 'Factura de proveedor creada con éxito',
              NumFact: NumFact,
              MontoTotal: totalMonto,
              Detalles: detalles
            });
          })
          .catch(err => {
            console.error('Error al insertar detalles en FACTURAS_PROVEEDORES_ORDENES_COMPRAS:', err);
            res.status(500).json({ message: 'Error al insertar detalles en FACTURAS_PROVEEDORES_ORDENES_COMPRAS' });
          });
      }
    });
  })
  .catch(err => {
    console.error('Error al crear la factura de proveedor:', err);
    res.status(500).json({ message: 'Error al crear la factura de proveedor' });
  });
};



//Delete operation
exports.deleteFacturaProveedor = (req, res) => {
    //viene el numFact en el req para eliminar ese registro 
    const { NumFact }= req.body;
    
    //Crear Query
    const sqlDelete= 'DELETE FROM FACTURAS_PROVEEDORES WHERE NumFact = ?';

    //Ejecutar la sentencia
    sql.query(connectionString, sqlDelete, [NumFact], (err, result) => {
        if(err){
            console.error('Error al eliminar Factura Proveedor',err);
            res.status(500).send('Error al eliminar la factura Proveedor');
            return;
        }

        console.log('Factura Proveedor eliminada con éxito', result);
        res.status(200).send('Factura Proveedor eliminada con éxito');
    });

};