const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const filters = {}

    // Filtrando por preço mínimo e preço máximo
    if (req.query.price_min || req.query.price_max) {
      filters.price = {}

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }

      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }

    // Filtrando pelo título
    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }

    const ads = await Ad.paginate(filters, {
      limit: 10,
      page: req.query.page || 1,
      sort: '-createdAt',
      populate: ['author']
    })

    return res.json(ads)
  }

  async show (req, res) {
    const ads = await Ad.findById(req.params.id)

    return res.json(ads)
  }

  async store (req, res) {
    console.log(req.body)
    console.log(req.userId)
    const ads = await Ad.create({ ...req.body, author: req.userId })

    return res.json(ads)
  }

  async update (req, res) {
    const ads = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(ads)
  }

  async destroy (req, res) {
    await Ad.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new AdController()
