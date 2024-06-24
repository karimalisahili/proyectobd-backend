const express = require('express');
const router = express.Router();

// Importar controladores
const sucursal = require('../controladores/sucursal');
const trabajadores = require('../controladores/trabajadores');
const marcas_vehiculos = require('../controladores/marcas_vehiculos');



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

//*********************RESPONSABLES******************************

//*********************FACTURAS_PROVEEDORES CRD****************
    
      

//*********************MARCAS_VEHICULOS*******************

router.get('/marcas_vehiculos', marcas_vehiculos.getMarcas_vehiculos);
router.post('/marcas_vehiculos', marcas_vehiculos.createMarcas_vehiculos);
router.delete('/marcas_vehiculos', marcas_vehiculos.deleteMarcas_vehiculos);
router.put('/marcas_vehiculos', marcas_vehiculos.updateMarcas_vehiculos);

//*********************TIPOS_VEHICULOS******************

//*********************LINEAS***************************

//*********************PROVEEDORES************************

//*********************MODELOS_VEHICULOS************************

//*********************VEHICULOS************************

//*********************FACTURAS_SERVICIOS CRD************************

//*********************AUTORIZADOS************************

//*********************ORDENES_SERVICIOS************************

//*********************SERVICIOS************************

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