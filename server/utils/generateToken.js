const jwt = require("jsonwebtoken");

module.exports = (id) => {
  return jwt.sign({ id }, process.env.SECRET_JWT_KEY, {
    expiresIn: "30d",
  });
};
