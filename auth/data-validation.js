import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const userSchema = Joi.object().keys({
  phone: Joi.string().min(10).max(13).required(),
  age: Joi.number().integer().min(18),
  password: Joi.string().min(8).required(),
  quoteId: Joi.number().integer(),
  title: Joi.string(),
});

const userUpdateSchema = Joi.object().keys({
  l_name: Joi.string().min(5).max(50).required(),
  f_name: Joi.string().min(5).max(50).required(),
  age: Joi.number().integer().min(18),
  productId: Joi.number().integer(),
  title: Joi.string(),
});


const validateReqUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors });
  }
  next();
};

const validateUpdateReqUser = (req, res, next) => {
  const { error } = userUpdateSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors });
  }
  next();
};

export {
  userSchema,
  userUpdateSchema,
  validateUpdateReqUser,
  validateReqUser,
};