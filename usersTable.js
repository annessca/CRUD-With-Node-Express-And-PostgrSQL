const createConnectionPool = require('./dbConfig');

// Create a users table
createConnectionPool.query('CREATE TABLE users(id SERIAL PRIMARY KEY, firstName VARCHAR(25) NOT NULL, lastName VARCHAR(25) NOT NULL, email VARCHAR(55) NOT NULL)', (error, result) => {
  console.log(error, result);
  createConnectionPool.end();
});