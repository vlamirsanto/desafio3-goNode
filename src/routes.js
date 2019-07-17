const express = require('express')
const UserController = require('./app/controllers/UserController')
const SessionsController = require('./app/controllers/SessionController')

const authMiddleware = require('./app/middlewares/auth')

const routes = express.Router()

routes.post('/users', UserController.save)
routes.post('/sessions', SessionsController.save)
routes.get('/token', authMiddleware, (req, res) => res.json({ ok: true }))

module.exports = routes
