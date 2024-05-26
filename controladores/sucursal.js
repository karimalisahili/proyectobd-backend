// GET operation
exports.getSucursal = (req, res) => {
  // Aquí simplemente estamos enviando un objeto JSON de ejemplo
  res.json({ id: 1, nombre: 'Sucursal 1', ubicacion: 'Ubicación 1' });
};

// POST operation
exports.createSucursal = (req, res) => {
  // Aquí estamos asumiendo que el cuerpo de la solicitud es un objeto JSON
  console.log(req.body);
  res.status(201).send();
};

// DELETE operation
exports.deleteSucursal = (req, res) => {
  // Aquí estamos asumiendo que el ID de la sucursal viene en el parámetro de la URL
  console.log(req.params.id);
  res.status(200).send();
};

// PUT operation
exports.updateSucursal = (req, res) => {
  // Aquí iría tu código para actualizar una sucursal
};