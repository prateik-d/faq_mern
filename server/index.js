require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const userRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');
const tagsRoutes = require('./routes/tags');
const articleRoutes = require('./routes/article');
const authRoutes = require('./routes/auth');
const faqCategoriesRoutes = require('./routes/faq/categories');
const faqQuestionsRoutes = require('./routes/faq/questions');

const app = express();

// db connection

connection();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/users/', userRoutes);
app.use('/api/categories/', categoriesRoutes);
app.use('/api/tags/', tagsRoutes);
app.use('/api/article/', articleRoutes);
app.use('/api/auth/', authRoutes);
app.use('/api/faq/categories', faqCategoriesRoutes);
app.use('/api/faq/questions', faqQuestionsRoutes);


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));