import Joi from "joi";

export const CreateLikeValidator = Joi.object({
  authorId: Joi.string().required(),
  postId: Joi.string().required(),
});
