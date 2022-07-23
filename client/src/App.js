import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";

// Categories
import AdminCategoriesList from "./pages/admin/Categories/List";
import AdminCategoriesView from "./pages/admin/Categories/View";
import AdminCategoriesEdit from "./pages/admin/Categories/Edit";
import AdminCategoriesAdd from "./pages/admin/Categories/Add";

// Tags
import AdminTagsList from "./pages/admin/Tags/List";
import AdminTagsView from "./pages/admin/Tags/View";
import AdminTagsEdit from "./pages/admin/Tags/Edit";
import AdminTagsAdd from "./pages/admin/Tags/Add";

// Article
import AdminArticleList from "./pages/admin/Article/List";
import AdminArticleView from "./pages/admin/Article/View";
import AdminArticleEdit from "./pages/admin/Article/Edit";
import AdminArticleAdd from "./pages/admin/Article/Add";

// FAQ Categories
import AdminFAQCategoriesList from "./pages/admin/faq/categories/List";
import AdminFAQCategoriesView from "./pages/admin/faq/categories/View";
import AdminFAQCategoriesEdit from "./pages/admin/faq/categories/Edit";
import AdminFAQCategoriesAdd from "./pages/admin/faq/categories/Add";

// FAQ Question
import AdminFAQQuestionsList from "./pages/admin/faq/question/List";
import AdminFAQQuestionsView from "./pages/admin/faq/question/View";
import AdminFAQQuestionsEdit from "./pages/admin/faq/question/Edit";
import AdminFAQQuestionsAdd from "./pages/admin/faq/question/Add";


import './assets/css/style.css';

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			{/* <Route path="/signup" exact element={<Signup />} /> */}
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			
			<Route exact path="/categories" element={<AdminCategoriesList />} />
			<Route exact path="/categories/view/:id" element={<AdminCategoriesView />} />
			<Route exact path="/categories/edit/:id" element={<AdminCategoriesEdit />} />
			<Route exact path="/categories/add" element={<AdminCategoriesAdd />} />
			
			<Route exact path="/tags" element={<AdminTagsList />} />
			<Route exact path="/tags/view/:id" element={<AdminTagsView />} />
			<Route exact path="/tags/edit/:id" element={<AdminTagsEdit />} />
			<Route exact path="/tags/add" element={<AdminTagsAdd />} />
			
			<Route exact path="/article" element={<AdminArticleList />} />
			<Route exact path="/article/view/:id" element={<AdminArticleView />} />
			<Route exact path="/article/edit/:id" element={<AdminArticleEdit />} />
			<Route exact path="/article/add" element={<AdminArticleAdd />} />
			
			<Route exact path="/faq/categories" element={<AdminFAQCategoriesList />} />
			<Route exact path="/faq/categories/view/:id" element={<AdminFAQCategoriesView />} />
			<Route exact path="/faq/categories/edit/:id" element={<AdminFAQCategoriesEdit />} />
			<Route exact path="/faq/categories/add" element={<AdminFAQCategoriesAdd />} />
			
			<Route exact path="/faq/questions" element={<AdminFAQQuestionsList />} />
			<Route exact path="/faq/questions/view/:id" element={<AdminFAQQuestionsView />} />
			<Route exact path="/faq/questions/edit/:id" element={<AdminFAQQuestionsEdit />} />
			<Route exact path="/faq/questions/add" element={<AdminFAQQuestionsAdd />} />

		</Routes>
	);
}

export default App;
