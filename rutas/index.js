const express = require('express');
const controller = require('../controladores/sucursal');

const router = express.Router();

//*********************SURCURSAL************************
router.get('/sucursal', controller.getSucursal);
router.post('/sucursal', controller.createSucursal);
router.delete('/sucursal', controller.deleteSucursal);
router.put('/sucursal', controller.updateSucursal);

//*********************TRABAJADORES************************

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