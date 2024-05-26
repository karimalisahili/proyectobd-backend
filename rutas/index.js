const express = require('express');
const controller = require('../controladores/sucursal');

const router = express.Router();
//*********************SURCURSAL************************
router.get('/sucursal', controller.getSucursal);
router.post('/sucursal', controller.createSucursal);
router.delete('/sucursal/:id', controller.deleteSucursal);
router.put('/sucursal/:id', controller.updateSucursal);

module.exports = router;