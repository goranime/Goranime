const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body;
    const newUser = { name, email, password };

    User
      .create(newUser)
      .then(result => {
        return res.status(201).json({
          id: result.id,
          name: result.name,
          email: req.body.email
        });
      })
      .catch(err => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;

    User
      .findOne({
        where: { email }
      })
      .then(user => {
        if(!user) {
          return next({
            name: "InvalidEmail"
          });  
        }
        const truePassword = comparePassword(password, user.password);
        if (!truePassword) {
          return next({
            name: "InvalidPassword"
          });
        }
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };
        const access_token = generateToken(payload);
        req.headers.access_token = access_token;
        return res.status(200).json({ access_token });
      })
      .catch(err => {
        next(err)
      });
  }
}

module.exports = UserController;