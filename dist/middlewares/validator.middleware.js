"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        console.error("error", message);
        res.status(422).json({ error: message });
        //   res.status(422).send(error.details[0].message);
    }
    else {
        next();
    }
};
exports.validate = validate;
