const Joi = require('joi');

const analysisValidation = data => {

  const schema = Joi.object({

    image: Joi.string().uri().required(),
    user_id: Joi.string().required(),
    user_name: Joi.string().min(2).max(100).required(),
    user_email: Joi.string().email().required(),

  });

  return schema.validate(data);
  
};

module.exports = analysisValidation