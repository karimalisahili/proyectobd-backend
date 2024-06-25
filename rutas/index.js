const express = require('express');
const router = express.Router();

// Importar controladores
const sucursal = require('../controladores/sucursal');
const trabajadores = require('../controladores/trabajadores');
const responsables = require('../controladores/responsables');
const marcas_vehiculos = require('../controladores/marcas_vehiculos');
const tipos_vehiculos = require('../controladores/tipos_vehiculos');
const facturas_proveedores= require('../controladores/facturas_proveedores');
const vehiculos = require('../controladores/vehiculos');
const lineas = require('../controladores/lineas');
const proveedores = require('../controladores/proveedores');
const modelos_vehiculos = require('../controladores/modelos_vehiculos');
const autorizados = require('../controladores/autorizados');
const login = require('../controladores/login');


//*********************login************************
router.post('/login',login.login);

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
router.get('/proveedores', proveedores.getProveedores);
router.post('/proveedores', proveedores.createProveedores);
router.delete('/proveedores', proveedores.deleteProveedores);
router.put('/proveedores', proveedores.updateProveedores);

//*********************MODELOS_VEHICULOS************************
router.get('/modelosvehiculos', modelos_vehiculos.getModelosVehiculos);
router.post('/modelosvehiculos',modelos_vehiculos.createModeloVehiculo);
router.delete('/modelosvehiculos',modelos_vehiculos.deleteModeloVehiculo);
router.put('/modelosvehiculos',modelos_vehiculos.updateModeloVehiculo);
//*********************VEHICULOS************************

router.get('/vehiculos', vehiculos.getVehiculos);
router.post('/vehiculos', vehiculos.createVehiculos);
router.delete('/vehiculos', vehiculos.deleteVehiculos);
router.put('/vehiculos', vehiculos.updateVehiculos);

//*********************FACTURAS_SERVICIOS CRD************************

//*********************AUTORIZADOS************************
router.get('/autorizados', autorizados.getAutorizados);
router.post('/autorizados', autorizados.createAutorizado);
router.delete('/autorizados',autorizados.deleteAutorizado);
router.put('/autorizados',autorizados.updateAutorizado);

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