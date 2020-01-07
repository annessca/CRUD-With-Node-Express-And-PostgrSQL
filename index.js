const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const { createUser, readUser, readUsers, updateUser, deleteUser } = require('./usersController');
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.status(200).json({
        status: "Success",
        message: "Welcome to CRUD operations with Node.js/Express and PostgreSQL"
    });
})

// Create http endpoints
app.post('/users', createUser)
app.get('/users/:id', readUser)
app.get('/users', readUsers)
app.put('/users/:id', updateUser)
app.delete('/users/:id', deleteUser)

app.listen(port, () => {
    console.log(`Application is started and running on port ${port}`)
})