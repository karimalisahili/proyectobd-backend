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

    sql.query(connectionString, sqlInsert,[CIResponsable, NombreResponsable], (err, result) => {
        if (err) {
            console.error('Error al crear el Responsable', err);
            res.status(500).json({ message: 'Error al crear el Responsable' });
            return;
        }

        console.log('Responsable creado con éxito');
        res.status(201).json({ message: 'Responsable creado con éxito' });
    });
};

exports.deleteResponsables = (req,res) => {
    const { CIResponsable } = req.body;
    const sqlDelete = `DELETE FROM RESPONSABLES WHERE CIResponsable = '${CIResponsable}'`;

    sql.query(connectionString, sqlDelete, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json('Error deleting responsable');
        } 
        console.log('Responsable eliminado con éxito');
        res.status(201).json('Responsable deleted successfully');

    });
};

exports.updateResponsables = (req,res) => {
    const { CIResponsable, NombreResponsable } = req.body;
    const sqlUpdate = `UPDATE RESPONSABLES SET NombreResponsable = '${NombreResponsable}' WHERE CIResponsable = '${CIResponsable}'`;

    sql.query(connectionString, sqlUpdate, (err, result) => {
       if (err) {
            console.error('Error al crear el Responsable', err);
            res.status(500).json({ message: 'Error al crear el Responsable' });
            return;
        }

        console.log('Responsable creado con éxito');
        res.status(201).json({ message: 'Responsable creado con éxito' });
    });
};