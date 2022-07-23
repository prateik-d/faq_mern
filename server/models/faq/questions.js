const mongoose = require('mongoose');
const Joi = require('joi');

const questionsSchema = new mongoose.Schema({
	title: { type: String, required: true },
	category: [{
				type: mongoose.Schema.Types.ObjectId, 
				ref: 'faq_categories',
				required: true 
	}],
	created_at: { type: Date, default: Date.now() },
	updated_at: { type: Date, default: Date.now() }
});


const Questions = mongoose.model("faq_questions", questionsSchema);

const validate = (data) => {
    const schema = Joi.object({
		title: Joi.string().required().label("Title"),
		category: Joi.required().label("Category")
	});
    return schema.validate(data);
}

module.exports = {Questions, validate};