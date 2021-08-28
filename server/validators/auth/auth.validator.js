const Joi = require('joi');

const { regexp } = require('../../constants');

module.exports = {
  registration: Joi.object().keys({
    email: Joi.string().regex(regexp.EMAIL_REGEXP).required(),
    password: Joi.string().regex(regexp.PASSWORD_REGEXP).required(),
  }),
};
