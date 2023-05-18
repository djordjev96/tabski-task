import Joi from "joi";

export const UpdateUserValidator = Joi.object({
  name: Joi.string().optional(),
  password: Joi.string().min(8).optional(),
});
