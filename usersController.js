const createConnectionPool = require('./dbConfig');

const createUser = (request, response) => {
    let foundUsers = [];
    let existingRecords;
    const { firstName, lastName, email } = request.body
    createConnectionPool.query('SELECT * from users', (error, results) => {
        if (error) {
            throw error
        }
        existingRecords = (results.rows);
        for (let iter = 0; iter < existingRecords.length; iter++) {
            existingRecords[iter] = Object.values(existingRecords[iter])
            foundUsers.push(existingRecords[iter][2])
        }
        if (foundUsers.includes(request.body.email)) {
            response.status(409).json({
                status: 'Failure',
                message: 'A user with that email adrress is already registered.'
            })
        }
        else if (!foundUsers.includes(request.body.email)) {
            createConnectionPool.query('INSERT INTO users (firstName, lastName, email) VALUES ($1, $2, $3)', [firstName, lastName, email], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(201).send({
                    status: 'Success',
                    message: 'Your account regisration is successful!'
                })
            })
        }
    })
}
  
// GET a single User
const readUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    createConnectionPool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({
            status: 'Success',
            message: results.rows
        })
    })
}

// GET all Users
const readUsers = (request, response) => {
    createConnectionPool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({
            status: 'Success',
            message: results.rows
        })
    })
}

// MODIFY an existing User
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { firstName, lastName, email } = request.body
  
    createConnectionPool.query(
      'UPDATE users SET firstName = $1, lastName = $2, email = $3 WHERE id = $4', [firstName, lastName, email, id], (error, results) =>{
        if (error) {
          throw error
        }
        response.status(200).json({
            status: 'Success',
            message: `User with ID Number ${id} is modified`
        })
      }
    )
}
  
// DELETE a User
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    createConnectionPool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        return response.status(200).json({message: `User with ID Number ${id} is successfully deleted`})
    })
}

// Export modules

exports.createUser = createUser;
exports.readUser = readUser;
exports.readUsers = readUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser
