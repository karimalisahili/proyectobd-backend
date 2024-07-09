// En detallefactura.js
const { sql, connectionString } = require('../config'); // Asegúrate de que la ruta sea correcta

exports.getDetalleFactura = (req, res) => {
	const { NumFact } = req.params; // Obtener el NumFact de los parámetros de la ruta

	// Consulta SQL ajustada para obtener el código de producto, el nombre, la cantidad pedida y el precio
	const query = `
		SELECT p.CodProd, p.NombreP, rc.CantProd, oc.Precio, (rc.CantProd * oc.Precio) AS Total
		FROM FACTURAS_PROVEEDORES fp
		JOIN FACTURAS_PROVEEDORES_ORDENES_COMPRAS fpo ON fp.NumFact = fpo.NumFact
		JOIN ORDENES_COMPRAS oc ON fpo.CodOrden = oc.CodOrden AND fpo.CodRequiCom = oc.CodRequiCom AND fpo.CodProd = oc.CodProd AND fpo.RIFSuc = oc.RIFSuc
		JOIN REQUISICIONES_COMPRA rc ON oc.CodRequiCom = rc.IdReq AND oc.CodProd = rc.CodProd AND oc.RIFSuc = rc.RIFSuc
		JOIN PRODUCTOS p ON oc.CodProd = p.CodProd
		WHERE fp.NumFact = ?`;

	// Ejecutar la consulta SQL
	sql.query(connectionString, query, [NumFact], (err, result) => {
		if (err) {
			console.error('Error al obtener el detalle de la factura', err);
			res.status(500).send('Error al obtener el detalle de la factura');
			return;
		}
		if (result.length === 0) {
			res.status(404).send('Factura no encontrada');
			return;
		}
		console.log('Detalle de la factura obtenido con éxito', result);
		res.status(200).json(result);
	});
};
