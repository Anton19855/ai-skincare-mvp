const Joi = require('joi');

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(100).required()
  });
  return schema.validate(data);
};

module.exports = loginValidation