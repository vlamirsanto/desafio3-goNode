const express = require('express')
const UserController = require('./app/controllers/UserController')

const routes = express.Router()

routes.post('/users', UserController.save)

module.exports = routes
