const { OAuth2Client } = require('google-auth-library');
const { User } = require("../models")
const { generateToken } = require("../helpers/jwt")


class GoogleOAuthController {
  static googleLogin (req, res, next) {
    const { id_token } = req.body
    let email

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      email = payload.email
      return User.findOne({
        where: {
          email
        }
      })
    })
    .then(user => {
      if (!user) {
        return User.create({
          email,
          password: Math.floor(Math.random() * 999999) + "pass"
        })
      } else {
        return user
      }
    })
    .then(user => {
      const payload = {
        id: user.id,
        email: user.email
      }
      const access_token =  generateToken(payload)
      return res.status(200).json({
        access_token
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = GoogleOAuthController