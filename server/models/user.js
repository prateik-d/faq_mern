const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	dob: { type: Date, required: true },
	mobile: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: Number, required: true },
	address: { type: String, required: true },
	created_at: { type: Date, default: Date.now() },
	updated_at: { type: Date, default: Date.now() }
});

userSchema.methods.generateAuthToken = function () 
{
    const token = jwt.sign({ _id: this.id}, process.env.JWT_PRIVATE_KEY,{expiresIn: "7d"});
    return token; 
}

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		// password: passwordComplexity().required().label("Password"),
		dob: Joi.required().label("DOB"),
		mobile: Joi.required().label("Mobile"),
		role: Joi.required().label("Role"),
		address: Joi.required().label("Address"),
	});
    return schema.validate(data);
}

module.exports = {User, validate};