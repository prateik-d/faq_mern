const mongoose = require('mongoose');
const Joi = require('joi');

const articleSchema = new mongoose.Schema({
	title: { type: String, required: true },
	slug: { type: String, required: true },
	short_text: { type: String, required: true },
	full_text: { type: String, required: true },
	category: [{
				type: mongoose.Schema.Types.ObjectId, 
				ref: 'categories',
				required: true 
	}],
	tags: [{
				type: mongoose.Schema.Types.ObjectId, 
				ref: 'tags',
				required: true 
	}],
	status: { type: Number, required: true },
	created_at: { type: Date, default: Date.now() },
	updated_at: { type: Date, default: Date.now() }
});


const Article = mongoose.model("article", articleSchema);

const validate = (data) => {
    const schema = Joi.object({
		title: Joi.string().required().label("Name"),
		slug: Joi.string().required().label("Slug"),
		short_text: Joi.string().required().label("Short Text"),
		full_text: Joi.string().required().label("Full Text"),
		category: Joi.array().required().label("Category"),
		tags: Joi.array().required().label("Tags"),
	});
    return schema.validate(data);
}

module.exports = {Article, validate};