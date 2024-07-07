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
const ordenes_servicios = require('../controladores/ordenes_servicios');
const servicios = require('../controladores/servicios');
const productos = require('../controladores/productos');
const productos_servicios = require('../controladores/productos_servicios');
const productos_tienda = require('../controladores/productos_tienda');
const requisiciones_compra = require('../controladores/requisiciones_compra');
const pagos = require('../controladores/pagos');
const reservas = require('../controladores/reservas');
const ordenes_compras = require('../controladores/ordenes_compras');
const facturas_tiendas = require('../controladores/facturas_tiendas');
const descuentos = require('../controladores/descuentos');
const inventarios = require('../controladores/inventarios');
const actividades = require('../controladores/actividades');
const distribuyen = require('../controladores/distribuyen');
const registran_fact_prod = require('../controladores/registran_fact_prod');
const reciben_suc_tipov = require('../controladores/recibensuctipov');
const apartan_res_act = require('../controladores/apartan_res_act');
const telefonos_duenos = require('../controladores/telefonos_duenos');
const mantenimiento_vehiculo = require('../controladores/mantenimiento_vehiculo');
const contratan_act_ordens_prod_serv = require('../controladores/contratan_act_ordens_prod_serv');
const facturas_servicios = require('../controladores/facturas_servicios');
const inventario_view = require('../controladores/inventario_view');
const estadisticas = require('../controladores/estadisticas');

//*********************login************************
router.post('/login',login.login);

//*********************SURCURSAL************************
router.get('/sucursal', sucursal.getSucursal);
router.post('/sucursal', sucursal.createSucursal);
router.delete('/sucursal', sucursal.deleteSucursal);
router.put('/sucursal', sucursal.updateSucursal);

//*********************TRABAJADORES************************
router.get('/trabajadores/:RIFSuc', trabajadores.getTrabajadores);
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
router.get('/facturas_servicios', facturas_servicios.getFacturasServicios);
router.post('/facturas_servicios', facturas_servicios.createFacturaServicio);
router.delete('/facturas_servicios', facturas_servicios.deleteFacturaServicio);

//*********************AUTORIZADOS************************
router.get('/autorizados', autorizados.getAutorizados);
router.post('/autorizados', autorizados.createAutorizado);
router.delete('/autorizados',autorizados.deleteAutorizado);
router.put('/autorizados',autorizados.updateAutorizado);

//*********************ORDENES_SERVICIOS************************
router.get('/ordenes_servicios', ordenes_servicios.getOrdenesServicios);
router.post('/ordenes_servicios', ordenes_servicios.createOrdenServicio);
router.delete('/ordenes_servicios', ordenes_servicios.deleteOrdenServicio);
router.put('/ordenes_servicios', ordenes_servicios.updateOrdenServicio);

//*********************SERVICIOS************************
router.get('/servicios', servicios.getServicios);
router.post('/servicios', servicios.createServicios);
router.delete('/servicios', servicios.deleteServicios);
router.put('/servicios', servicios.updateServicios);
//*********************PRODUCTOS************************
router.get('/productos', productos.getProductos);
router.post('/productos', productos.createProducto);
router.delete('/productos', productos.deleteProducto);
router.put('/productos', productos.updateProducto);

//*********************PRODUCTOS_SERVICIOS************************
router.get('/productos_servicios', productos_servicios.getProductosServicios);
router.post('/productos_servicios', productos_servicios.createProductosServicio);
router.delete('/productos_servicios', productos_servicios.deleteProductosServicio);

//*********************PRODUCTOS_TIENDA CRD************************
router.get('/productos_tienda', productos_tienda.getProductosTienda);
router.post('/productos_tienda', productos_tienda.createProductosTienda);
router.delete('/productos_tienda', productos_tienda.deleteProductosTienda);

//*********************REQUISICIONES_COMPRA************************
router.get('/requisiciones_compra', requisiciones_compra.getRequisicionesCompra);
router.post('/requisiciones_compra', requisiciones_compra.createRequisicionCompra);
router.delete('/requisiciones_compra', requisiciones_compra.deleteRequisicionCompra);
router.put('/requisiciones_compra', requisiciones_compra.updateRequisicionCompra);

//*********************PAGOS CRD************************
router.get('/pagos',pagos.getPagos);
router.post('/pagos',pagos.createPago);
router.delete('/pagos',pagos.deletePago);
//*********************RESERVAS************************
router.get('/reservas',reservas.getReservas);
router.post('/reservas', reservas.createReserva);
router.delete('/reservas', reservas.deleteReserva);
router.put('/reservas', reservas.updateReserva );
//*********************ORDENES_COMPRAS CRD************************
router.get('/ordenescompras', ordenes_compras.getOrdenesCompras);
router.post('/ordenescompras', ordenes_compras.createOrdenCompra);
router.delete('/ordenescompras', ordenes_compras.deleteOrdenCompra);
//*********************FACTURAS_TIENDAS CRD**************************
router.get('/facturastiendas', facturas_tiendas.getFacturasTiendas);
router.post('/facturastiendas', facturas_tiendas.createFacturaTienda);
router.delete('/facturastiendas', facturas_tiendas.deleteFacturaTienda);
//*********************DESCUENTOS**************************
router.get('/descuentos/:RIFSuc', descuentos.getDescuentos);
router.post('/descuentos', descuentos.createDescuento);
router.delete('/descuentos', descuentos.deleteDescuento);
router.put('/descuentos', descuentos.updateDescuento);
//*********************INVENTARIOS**************************
router.get('/inventarios', inventarios.getInventarios);
router.post('/inventarios', inventarios.createInventario);
router.delete('/inventarios', inventarios.deleteInventario);
router.put('/inventarios', inventarios.updateInventario);
//*********************ACTIVIDADES**************************
router.get('/actividades', actividades.getActividades);
router.post('/actividades', actividades.createActividad);
router.delete('/actividades', actividades.deleteActividad);
router.put('/actividades', actividades.updateActividad);
//*********************DISTRIBUYEN**************************
router.get('/distribuyen', distribuyen.getDistribuyen);
router.post('/distribuyen',distribuyen.createDistribuyen);
router.delete('/distribuyen', distribuyen.deleteDistribuyen);
//*********************REGISTRAN_FACT_PROD**************************
router.get('/registranfactprod', registran_fact_prod.getRegistranFactProd);
router.post('/registranfactprod', registran_fact_prod.createRegistranFactProd);
router.delete('/registranfactprod', registran_fact_prod.deleteRegistranFactProd);
router.put('/registranfactprod', registran_fact_prod.updateRegistranFactProd);
//*********************RECIBEN_SUC_TIPOV CRD**************************
router.get('/recibensuctipov', reciben_suc_tipov.getRecibenSucTipoV);
router.post('/recibensuctipov', reciben_suc_tipov.createRecibenSucTipoV);
router.delete('/recibensuctipov', reciben_suc_tipov.deleteRecibenSucTipoV);
//*********************APARTAN_RES_ACT**************************
router.get('/apartanresact', apartan_res_act.getApartanResAct);
router.post('/apartanresact', apartan_res_act.createApartanResAct);
router.delete('/apartanresact', apartan_res_act.deleteApartanResAct);
router.put('/apartanresact', apartan_res_act.updateApartanResAct);
//*********************TELEFONOS_DUENOS**************************
router.get('/telefonosduenos', telefonos_duenos.getTelefonosDuenos);
router.post('/telefonosduenos', telefonos_duenos.createTelefonoDueno);
router.delete('/telefonosduenos', telefonos_duenos.deleteTelefonoDueno);
router.put('/telefonosduenos', telefonos_duenos.updateTelefonoDueno);
//*********************MANTENIMIENTO_VEHICULO**************************
router.get('/mantenimientovehiculo', mantenimiento_vehiculo.getMantenimientoVehiculo);
router.post('/mantenimientovehiculo', mantenimiento_vehiculo.createMantenimientoVehiculo);
router.delete('/mantenimientovehiculo', mantenimiento_vehiculo.deleteMantenimientoVehiculo);
router.put('/mantenimientovehiculo',mantenimiento_vehiculo.updateMantenimientoVehiculo);
//*********************CONTRATAN_ACT_ORDENS_PROD_SERV**************************
router.get('/contratanactordensprodserv', contratan_act_ordens_prod_serv.getContratanActOrdensProdServ);
router.post('/contratanactordensprodserv', contratan_act_ordens_prod_serv.createContratanActOrdensProdServ);
router.delete('/contratanactordensprodserv', contratan_act_ordens_prod_serv.deleteContratanActOrdensProdServ);
router.put('/contratanactordensprodserv', contratan_act_ordens_prod_serv.updateContratanActOrdensProdServ);
//*********************INVENTARIO_VIEW**************************
router.get('/inventario_view/:RIFSuc', inventario_view.getInventarios);

//********************ESTADISTICAS***************************
router.get('/estadisticas_marcas_servicio', estadisticas.getMarcasServicios);
router.get('/estadisticas_empleados_mas_servicios/:Anio/:Mes', estadisticas.getEmpleadosMasServicios);
router.get('/estadisticas_empleados_menos_servicios/:Anio/:Mes', estadisticas.getEmpleadosMenosServicios);

module.exports = router;