const express = require('express');
const router = express.Router();

// Importar controladores
const sucursal = require('../controladores/sucursal');
const trabajadores = require('../controladores/trabajadores');
const responsables = require('../controladores/responsables');
const marcas_vehiculos = require('../controladores/marcas_vehiculos');
const tipos_vehiculos = require('../controladores/tipos_vehiculos');
<<<<<<< HEAD
<<<<<<< HEAD
const lineas = require('../controladores/lineas');

=======
const facturas_proveedores= require('../controladores/facturas_proveedores')
>>>>>>> 4ee4621a2cd6fc53ce32c1218016b6a7a3cbcc4d
=======
const facturas_proveedores= require('../controladores/facturas_proveedores');
const modelos_vehiculos= require('../controladores/modelos_vehiculos');
>>>>>>> e244983e99bc174705c93ef895122a2a77e47cee


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
router.get('/responsables', responsables.getResponsables);
router.post('/responsables', responsables.createResponsables);
router.delete('/responsables', responsables.deleteResponsables);
router.put('/responsables', responsables.updateResponsables);

//*********************FACTURAS_PROVEEDORES CRD****************
 router.get('/facturasproveedores',facturas_proveedores.getFacturaProveedor);   
 router.post('/facturasproveedores', facturas_proveedores.createFacturaProveedor);   
 router.delete('/facturasproveedores', facturas_proveedores.deleteFacturaProveedor);  

//*********************MARCAS_VEHICULOS*******************

router.get('/marcas_vehiculos', marcas_vehiculos.getMarcas_vehiculos);
router.post('/marcas_vehiculos', marcas_vehiculos.createMarcas_vehiculos);
router.delete('/marcas_vehiculos', marcas_vehiculos.deleteMarcas_vehiculos);
router.put('/marcas_vehiculos', marcas_vehiculos.updateMarcas_vehiculos);

//*********************TIPOS_VEHICULOS******************
router.get('/tiposvehiculos', tipos_vehiculos.getTiposVehiculos);
router.post('/tiposvehiculos', tipos_vehiculos.createTiposVehiculos);
router.delete('/tiposvehiculos', tipos_vehiculos.deleteTiposVehiculos);
router.put('/tiposvehiculos', tipos_vehiculos.updateTiposVehiculos);


//*********************LINEAS***************************
router.get('/lineas', lineas.getLineas);
router.post('/lineas', lineas.createLineas);
router.delete('/lineas', lineas.deleteLineas);
router.put('/lineas', lineas.updateLineas);

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