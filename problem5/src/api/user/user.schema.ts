import Joi from "joi";

const name = Joi.string();
const userEmail = Joi.string().email();
const password = Joi.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
);

export const signUpSchema = Joi.object().keys({
    name: name.required(),
    userEmail: userEmail.required(),
    password: password.required(),
});

export const signInSchema = Joi.object().keys({
    userEmail: userEmail.required(),
    password: password.required(),
});

export const updateUserSchema = Joi.object().keys({
    name
})