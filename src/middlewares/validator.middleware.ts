import { NextFunction, Request, Response } from "express";
import Joi, { Schema } from "joi";

export const validate =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      console.error("error", message);
      res.status(422).json({ error: message });
      //   res.status(422).send(error.details[0].message);
    } else {
      next();
    }
  };
