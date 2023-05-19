import Joi from "joi";

export const CreateLikeValidator = Joi.object({
  userId: Joi.string().required(),
  postId: Joi.string().required(),
});
