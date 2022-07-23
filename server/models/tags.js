const mongoose = require('mongoose');
const Joi = require('joi');

const tagsSchema = new mongoose.Schema({
	name: { type: String, required: true },
	slug: { type: String, required: true },
	created_at: { type: Date, default: Date.now() },
	updated_at: { type: Date, default: Date.now() }
});


const Tags = mongoose.model("tags", tagsSchema);

const validate = (data) => {
    const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		slug: Joi.string().required().label("Slug")
	});
    return schema.validate(data);
}

module.exports = {Tags, validate};