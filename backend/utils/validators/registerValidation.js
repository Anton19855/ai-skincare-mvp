const Joi = require('joi');

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(100).required()
  });
  return schema.validate(data);
};

module.exports = registerValidation;
