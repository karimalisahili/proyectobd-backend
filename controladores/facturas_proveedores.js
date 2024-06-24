const {sql, connectionString} = require('../config'); 

//Get operation
exports.getFacturaProveedor = (req, res) => {
    const sqlSelect= 'SELECT * FROM FACTURAS_PROVEEDORES';

     sql.query(connectionString, sqlSelect,(err, result) => {
         if (err) {
             console.error('Error al obtener Facturas Proveedores', err);
             res.status(500).send('Error al obtener las Facturas Proveedores');
             return;
         }
         console.log('Facturas_Proveedores obtenido con exito',result);
         res.status(200).json(result);
     }
     )
};

//Post operation
exports.createFacturaProveedor = (req, res) => {
    const {NumFact, Monto, Fecha}= req.body;

    const sqlInsert='INSERT INTO FACTURAS_PROVEEDORES(NumFact,Monto,Fecha) VALUES (?,?,?)';
    

   
    sql.query(connectionString, sqlInsert, [NumFact,Monto,Fecha], (err, result) => {
        
         if(err){
            console.error('Error al insertar en la base de datos', err);
            res.status(500).send('Error al insertar en la base de datos');
            return;
         } 

         console.log('Factura de Proveedor creada con éxito', result);
         res.status(201).send('Factura proveedor creada con éxito');
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