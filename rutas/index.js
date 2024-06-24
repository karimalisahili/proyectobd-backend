const express = require('express');
const router = express.Router();

// Importar controladores
const sucursal = require('../controladores/sucursal');
const trabajadores = require('../controladores/trabajadores');



//*********************SURCURSALES************************
router.get('/sucursal', sucursal.getSucursal);
router.post('/sucursal', sucursal.createSucursal);
router.delete('/sucursal', sucursal.deleteSucursal);
router.put('/sucursal', sucursal.updateSucursal);

//*********************TRABAJADORES************************
router.get('/trabajadores', trabajadores.getTrabajadores);
router.post('/trabajadores', trabajadores.createTrabajadores);
router.delete('/trabajadores', trabajadores.deleteTrabajadores);
router.put('/trabajadores', trabajadores.updateTrabajadores);

//*********************RESPONSABLES****************************** K

//*********************FACTURAS_PROVEEDORES CRD**************** E

//*********************MARCAS_VEHICULOS*******************S

//*********************TIPOS_VEHICULOS******************K

//*********************LINEAS***************************E

//*********************PROVEEDORES************************S

//*********************MODELOS_VEHICULOS************************K

//*********************VEHICULOS************************E

//*********************FACTURAS_SERVICIOS CRD************************S

//*********************AUTORIZADOS************************K

//*********************ORDENES_SERVICIOS************************E

//*********************SERVICIOS************************S

//*********************PRODUCTOS************************

//*********************PRODUCTOS_SERVICIOS************************

//*********************PRODUCTOS_TIENDA CRD************************

//*********************REQUISICIONES_COMPRA************************

//*********************PAGOS CRD************************

//*********************RESERVAS************************

//*********************ORDENES_COMPRAS CRD************************

//*********************FACTURAS_TIENDAS CRD**************************

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