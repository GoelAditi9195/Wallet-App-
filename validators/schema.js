const Joi = require('@hapi/joi');



const walletSchema = Joi.object({
  name: Joi.string().alphanum().min(1).required(),
  balance: Joi.number().required(),
});

const transactionSchema = Joi.object({
  amount: Joi.number().required(),
  Description: Joi.string().min(1).max(20).required(),
})
module.exports = {
  walletSchema, 
  transactionSchema,
};
