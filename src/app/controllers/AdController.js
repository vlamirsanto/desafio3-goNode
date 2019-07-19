const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const ads = await Ad.find()

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
