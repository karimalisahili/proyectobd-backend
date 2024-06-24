const {sql, connectionString} = require('../config');

exports.getResponsables = (req,res) => {
    const sqlSelect = 'SELECT * FROM RESPONSABLES';

    sql.query(connectionString, sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving responsables');
        } else {
            res.status(200).json(result);
        }
    });
};

exports.createResponsables = (req, res) => {
    const { CIResponsable, NombreResponsable } = req.body;
    const sqlInsert = `INSERT INTO RESPONSABLES (CIResponsable, NombreResponsable) VALUES ('${CIResponsable}', '${NombreResponsable}')`;

    sql.query(connectionString, sqlInsert, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error creating responsable');
        } else {
            res.status(200).send('Responsable created successfully');
            console.log('Responsable creado con éxito');
        }
    });
};

exports.deleteResponsables = (req,res) => {
    const { CIResponsable } = req.body;
    const sqlDelete = `DELETE FROM RESPONSABLES WHERE CIResponsable = '${CIResponsable}'`;

    sql.query(connectionString, sqlDelete, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error deleting responsable');
        } else {
            res.status(200).send('Responsable deleted successfully');
            console.log('Responsable eliminado con éxito');
        }
    });
};

exports.updateResponsables = (req,res) => {
    const { CIResponsable, NombreResponsable } = req.body;
    const sqlUpdate = `UPDATE RESPONSABLES SET NombreResponsable = '${NombreResponsable}' WHERE CIResponsable = '${CIResponsable}'`;

    sql.query(connectionString, sqlUpdate, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error updating responsable');
        } else {
            res.status(200).send('Responsable updated successfully');
            console.log('Responsable actualizado con éxito');
        }
    });
};