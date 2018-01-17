const passport = require('../passport/login')
const adminPassport = require('../passport/admin')

exports.requiresLogin = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization
    const decodedToken = passport.decodeAccessToken(token)
    if (decodedToken !== undefined) {
      req.userId = decodedToken.userId
      next()
    } else {
      res.status(500).json(('Wrong token'))
    }
  } else {
    res.status(500).json(('Non authorized'))
  }
}

exports.requiresAdminLogin = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization
    const decodedToken = adminPassport.decodeAccessToken(token)
    if (decodedToken !== undefined) {
      req.adminId = decodedToken.adminId
      next()
    } else {
      res.status(500).json(('Wrong token'))
    }
  } else {
    res.status(500).json(('Non authorized'))
  }
}
