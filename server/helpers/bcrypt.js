const bcrypt = require('bcryptjs');

function hashPassword(plainPassword) {
  const salt = bcrypt.genSaltSync(11);
  return bcrypt.hashSync(plainPassword, salt);
}

function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = {
  hashPassword,
  comparePassword
}