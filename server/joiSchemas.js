//Requiring JOI for schema validations
const Joi = require("joi");

//Schema validations for Users
const userSchema = Joi.object({
  id: Joi.number().required().min(1),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string()
    .valid(
      "Agender",
      "Bigender",
      "Female",
      "Genderfluid",
      "Genderqueer",
      "Male",
      "Non-binary",
      "Polygender"
    )
    .required(),
  domain: Joi.string().required(),
  available: Joi.boolean().required(),
  avatar: Joi.string(),
});

module.exports = { userSchema };
