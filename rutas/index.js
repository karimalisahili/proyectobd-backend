const express = require('express');
const router = express.Router();

// Importar controladores
const sucursal = require('../controladores/sucursal');
const trabajadores = require('../controladores/trabajadores');



//*********************SURCURSAL************************
router.get('/sucursal', sucursal.getSucursal);
router.post('/sucursal', sucursal.createSucursal);
router.delete('/sucursal', sucursal.deleteSucursal);
router.put('/sucursal', sucursal.updateSucursal);

//*********************TRABAJADORES************************
router.get('/trabajadores', trabajadores.getTrabajadores);
router.post('/trabajadores', trabajadores.createTrabajadores);
router.delete('/trabajadores', trabajadores.deleteTrabajadores);
router.put('/trabajadores', trabajadores.updateTrabajadores);

//*********************RESPONSABLES************************

//*********************FACTURAS_PROVEEDORES****************

//*********************MARCAS_VEHICULOS*******************

//*********************TIPOS_VEHICULOS******************

//*********************LINEAS***************************

//*********************PROVEEDORES************************

//*********************MODELOS_VEHICULOS************************

//*********************VEHICULOS************************

//*********************FACTURAS_SERVICIOS************************

//*********************AUTORIZADOS************************

//*********************ORDENES_SERVICIOS************************

//*********************SERVICIOS************************

//*********************PRODUCTOS************************

//*********************PRODUCTOS_SERVICIOS************************

//*********************PRODUCTOS_TIENDA************************

//*********************REQUISICIONES_COMPRA************************

//*********************PAGOS************************

//*********************RESERVAS************************

//*********************ORDENES_COMPRAS************************

//*********************FACTURAS_TIENDAS**************************

//*********************DESCUENTOS**************************

//*********************INVENTARIOS**************************

//*********************ACTIVIDADES**************************

//*********************DISTRIBUYEN**************************

//*********************REGISTRAN_FACT_PROD**************************

//*********************RECIBEN_SUC_TIPOV**************************

//*********************APARTAN_RES_ACT**************************

//*********************TELEFONOS_DUENOS**************************

//*********************MANTENIMIENTO_VEHICULO**************************

//*********************CONTRATAN_ACT_ORDENS_PROD_SERV**************************



module.exports = router;