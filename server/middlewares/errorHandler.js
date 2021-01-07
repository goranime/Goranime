function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      let alert = err.errors.map(error => error.message);
      return res.status(400).json(alert);

    case "SequelizeUniqueConstraintError":
      let errorMsg = err.errors.map(error => error.message);
      return res.status(400).json(errorMsg);

    case "InvalidEmail":
      return res.status(401).json({
        message: "Try another one, this email has been taken"
      });

    case "InvalidPassword":
      return res.status(401).json({
        message: "Wrong password, please try again"
      });

    case "UnregisteredUser":
      return res.status(401).json({
        message: "Please login first"
      });
    
    case "Unauthorized":
      return res.status(401).json({
        message: "You are unable to access this content"
      })
    
    case "NotFound":
      return res.status(404).json({
        message: "Not Found"
      })
      
    default:
      return res.status(500).json({
        message: "Internal Server Error",
      });
  }
}

module.exports = errorHandler;