const mongoose = require('mongoose');
const Joi = require('joi');

const categoriesSchema = new mongoose.Schema({
	title: { type: String, required: true },
	created_at: { type: Date, default: Date.now() },
	updated_at: { type: Date, default: Date.now() }
});


const Categories = mongoose.model("faq_categories", categoriesSchema);

const validate = (data) => {
    const schema = Joi.object({
		title: Joi.string().required().label("Title")
	});
    return schema.validate(data);
}

module.exports = {Categories, validate};