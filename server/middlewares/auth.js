const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

async function authentication(req, res, next) {
  try {
    const authParams = verifyToken(req.headers.access_token);
    const currentUser = await User.findOne({
      where: {
        id: authParams.id,
        name: authParams.name,
        email: authParams.email,
      },
    });
    if (!currentUser) {
      return next({
        name: "UnregisteredUser"
      })
    }
    req.User = currentUser;
    next();
  }
  catch {
    next(err);
    // res.send(err)
  }
}

// async function authorization(req, res, next) {
//   try {
//     const idAnime = req.params.id;
//     const userId = req.user.id;
//     const anime = await anime.findOne({
//       where: {
//         id: idAnime
//       },
//     });
//     if(!anime) {
//       next({
//         name: "Unauthorized"
//       });
//     }
//   }
//   catch {
//     next(err);
//   }
// }

module.exports = {
  authentication,
  // authorization
}