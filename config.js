const sql = require('msnodesqlv8');

const connectionString = `server=${process.env.DATABASE_SERVER};Database=${process.env.DATABASE_NAME};Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}`;

sql.open(connectionString, (err, connection) => {
    if (err) console.log("Error creating connection", err);
    else console.log("Successfully connected");
});

module.exports = { sql, connectionString };