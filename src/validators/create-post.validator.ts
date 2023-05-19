import Joi from "joi";

export const CreatePostValidator = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  authorId: Joi.string().required(),
});
