import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./styles.module.css";
import "./main.css";

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Breadcrumbs from '../../components/Breacrumbs/Breadcrumbs';


const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [role, setRole] = useState();
	const [userCount, setUserCount] = useState();
	const [exerciseCount, setExerciseCount] = useState();
	const [blogsCount, setBlogsCount] = useState();
	const [trainerCount, setTrainerCount] = useState();


	useEffect(() => {
		const role_d = (localStorage.getItem('role'));

		if (role_d) 
		{
			setRole(role_d);

			axios.get(process.env.REACT_APP_SERVER_URL + "/api/users/list_count")
			.then(res => {
				const data = res.data;
				setUserCount(res.data)
			});

			// axios.get(process.env.REACT_APP_SERVER_URL + "/api/exercise/list_count")
			// .then(res => {
			// 	const data = res.data;
			// 	setExerciseCount(res.data)
			// });

			// axios.get(process.env.REACT_APP_SERVER_URL + "/api/blogs/list_count")
			// .then(res => {
			// 	const data = res.data;
			// 	setBlogsCount(res.data)
			// });

			// axios.get(process.env.REACT_APP_SERVER_URL + "/api/trainer/list_count")
			// .then(res => {
			// 	const data = res.data;
			// 	setTrainerCount(res.data)
			// });
		
		}
		

	}, []);

	return (
		<>

					{ 
						role === '1' ?  
							<>
								<Sidebar />

								<div id="right-panel" className="right-panel">
									<Header /> 
									<Breadcrumbs breadcrumbs='Dashboard' title='Dashboard' />

									<div className="content mt-3">

										<div className="col-sm-12">
											<div role="alert" className="fade alert alert-success alert-dismissible show">
												<button type="button" className="btn-close" aria-label="Close alert"></button>
												<p className="alert-success text-left">
													<span className="badge bg-success">Success</span>  
													You successfully read this important alert message.
												</p>
											</div>
										</div>
										
										<div className="col-sm-6 col-lg-3">
											<div className="card-columns text-white">
												<div className="card bg-primary">
													<div className="card-body text-center">
														<h4 className="mb-0">
															<span className="count">
																{userCount}
															</span>
														</h4>
														<p className="text-light">User Enrolled</p>
													</div>
												</div>
											</div>
										</div>
										
										
										<div className="col-sm-6 col-lg-3">
											<div className="card-columns text-white">
												<div className="card bg-warning">
													<div className="card-body text-center">
														<h4 className="mb-0">
															<span className="count">
																10468
															</span>
														</h4>
														<p className="text-light">Members online</p>
													</div>
												</div>
											</div>
										</div>
										
										
										<div className="col-sm-6 col-lg-3">
											<div className="card-columns text-white">
												<div className="card bg-info">
													<div className="card-body text-center">
														<h4 className="mb-0">
															<span className="count">
																10468
															</span>
														</h4>
														<p className="text-light">Members online</p>
													</div>
												</div>
											</div>
										</div>
										
										
										
										<div className="col-sm-6 col-lg-3">
											<div className="card-columns text-white">
												<div className="card bg-danger">
													<div className="card-body text-center">
														<h4 className="mb-0">
															<span className="count">
																10468
															</span>
														</h4>
														<p className="text-light">Members online</p>
													</div>
												</div>
											</div>
										</div>
										

									</div>
										
								</div>

							</>
						:
						''
					}

			{/* <div className={styles.main_container}>
				<nav className={styles.navbar}>
					<h1>Dragon MMA Gym</h1>

					{ role == 2 ?  <h2>Admin</h2> : ''}
					<button className={styles.white_btn} onClick={handleLogout}>
						Logout
					</button>
				</nav>
			</div>
			<div className="row">
				{role} 
			</div> */}
		</>
	);
};

export default Main;
