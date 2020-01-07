const { Pool } = require("pg")
const createConnectionPool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'crud_database',
    password: 'anneralphessien',
    port: 5432
});

module.exports = createConnectionPool;