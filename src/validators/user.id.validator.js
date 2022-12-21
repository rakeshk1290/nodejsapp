const Joi = require('joi')

const IDSchema = Joi.object().keys({
  id: Joi.number().required()
})
module.exports = IDSchema
