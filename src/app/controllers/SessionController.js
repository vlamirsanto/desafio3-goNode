const User = require('../models/User')

class SessionController {
  async save (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: 'Usuário não existe!' })
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Senha inválida!' })
    }

    return res.status(200).json({ user, token: User.generateToken(user) })
  }
}

module.exports = new SessionController()
