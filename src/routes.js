const express = require('express')
const routes = express.Router()

// Importando os controllers pelo pacote "require-dir"
const controllers = require('./app/controllers')

// Middlewares
const authMiddleware = require('./app/middlewares/auth')

routes.post('/users', controllers.UserController.save)
routes.post('/sessions', controllers.SessionController.save)
routes.get('/token', authMiddleware, (req, res) => res.json({ ok: true }))

routes.use(authMiddleware)

/**
 * Ads
 */
routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', controllers.AdController.store)
routes.put('/ads/:id', controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

/**
 * Purchases
 */
routes.post('/purchase', controllers.PurchaseController.save)

module.exports = routes
