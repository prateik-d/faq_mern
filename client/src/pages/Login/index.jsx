import { useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import styles from "./styles.module.css";

import {Nav,  Navbar } from 'react-bootstrap';


const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try 
		{
			const url = process.env.REACT_APP_SERVER_URL + "/api/auth";
			const { data: res } = await axios.post(url, data);

			localStorage.setItem("token", res.data);
			localStorage.setItem("role", res.role);

			window.location = "/";
		} 
		catch (error) 
		{
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Nav.Link href="#deets">More details</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Good stuff
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
  
			<div className={styles.login_container}>
				<div className={styles.login_form_container}>
					<div className={styles.left}>
						<form className={styles.form_container} onSubmit={handleSubmit}>
							<h1>Login to Your Account</h1>
							<input
								type="email"
								placeholder="Email"
								name="email"
								onChange={handleChange}
								value={data.email}
								required
								className={styles.input}
							/>
							<input
								type="password"
								placeholder="Password"
								name="password"
								onChange={handleChange}
								value={data.password}
								required
								className={styles.input}
							/>
							{error && <div className={styles.error_msg}>{error}</div>}
							<button type="submit" className={styles.green_btn}>
								Sing In
							</button>
						</form>
					</div>
					{/* <div className={styles.right}>
						<h1>New Here ?</h1>
						<Link to="/signup">
							<button type="button" className={styles.white_btn}>
								Sing Up
							</button>
						</Link>
					</div> */}
				</div>
			</div>
		</>
	);
};

export default Login;
