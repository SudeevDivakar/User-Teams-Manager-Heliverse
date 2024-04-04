//Require joi schema validations
const { userSchema } = require("./joiSchemas.js");

//Middleware to validate user
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    res.status(400);
    throw new Error(msg);
  } else {
    next();
  }
};

module.exports = { validateUser };
