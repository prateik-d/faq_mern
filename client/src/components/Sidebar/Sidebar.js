import React from 'react';
import logo from '../../assets/images/logo.png';
import logo2 from '../../assets/images/logo2.png';
import './Sidebar.css';
import Dropdown from 'react-bootstrap/Dropdown';

import { Link } from 'react-router-dom';



  

const Sidebar = () => {

    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};


    return (
                <aside id="left-panel" className="left-panel">
                    <nav className="navbar navbar-expand-sm navbar-default">

                        <div className="navbar-header">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fa fa-bars"></i>
                            </button>
                            <a className="navbar-brand" href="./">
                                {/* <img src={logo} alt="Logo" />     */}
                                Knowledge Base
                            </a>
                            {/* <a className="navbar-brand hidden" href="./">
                                <img src={logo2} alt="Logo" />
                            </a> */}
                        </div>

                        <div id="main-menu" className="main-menu collapse navbar-collapse">

                            <ul className="nav navbar-nav">
                                <li className="menu-item-has-children dropdown active">
                                    <Dropdown>
                                        <Dropdown.Toggle className='noChildren'>
                                            <Link to={'/'}>
                                                <i className="menu-icon fa fa-dashboard"></i>
                                                <span >
                                                    Dashboard
                                                </span>
                                            </Link>
                                        </Dropdown.Toggle>
                                    </Dropdown>
                                </li>

                                {/* <li className="menu-item-has-children dropdown">
                                    
                                    <Dropdown>
                                        <Dropdown.Toggle>
                                            <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                                                <i className="menu-icon fa fa-user"></i> 
                                                <span>
                                                    Manage Users
                                                </span>
                                            </span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item >
                                                <Link to={"/users/list"}>
                                                    <i className="fa fa-list"></i>
                                                    <span className='submenu'>
                                                        User List
                                                    </span>
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item >
                                                <Link to={"/users/add"}>
                                                    <i className="fa fa-user-plus"></i>
                                                    <span className='submenu'>
                                                        Add Users
                                                    </span>
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item >
                                                <Link to={"/users/roles"}>
                                                    <i className="fa fa-tag"></i>
                                                    <span className='submenu'>
                                                        User Roles
                                                    </span>
                                                </Link>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li> */}

                                <li className="menu-item-has-children dropdown active">
                                    <Dropdown>
                                        <Dropdown.Toggle className='noChildren'>
                                            <Link to={'/categories'}>
                                                <i className="menu-icon fa fa-list-alt"></i>
                                                <span >
                                                    Categories
                                                </span>
                                            </Link>
                                        </Dropdown.Toggle>
                                    </Dropdown>
                                </li>

                                <li className="menu-item-has-children dropdown active">
                                    <Dropdown>
                                        <Dropdown.Toggle className='noChildren'>
                                            <Link to={'/tags'}>
                                                <i className="menu-icon fa fa-tags"></i>
                                                <span >
                                                    Tags
                                                </span>
                                            </Link>
                                        </Dropdown.Toggle>
                                    </Dropdown>
                                </li>

                                <li className="menu-item-has-children dropdown active">
                                    <Dropdown>
                                        <Dropdown.Toggle className='noChildren'>
                                            <Link to={'/article'}>
                                                <i className="menu-icon fa fa-newspaper-o"></i>
                                                <span >
                                                    Article
                                                </span>
                                            </Link>
                                        </Dropdown.Toggle>
                                    </Dropdown>
                                </li>

                                <li className="menu-item-has-children">   
                                    <Dropdown>
                                        <Dropdown.Toggle className='noChildren'>
                                            <i className="menu-icon fa fa-sign-out"></i> 
                                            <span className='logout_span'  onClick={handleLogout}>
                                                Logout
                                            </span>
                                            
                                        </Dropdown.Toggle>
                                    </Dropdown>
                                </li>

                                

                                <li className="menu-item-has-children dropdown">
                                    
                                    <Dropdown>
                                        <Dropdown.Toggle>
                                            <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                                                <i className="menu-icon fa fa-question"></i> 
                                                <span>
                                                    FAQ Management
                                                </span>
                                            </span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item >
                                                <Link to={"/faq/categories"}>
                                                    <i className="fa fa-briefcase"></i>
                                                    <span className='submenu'>
                                                        Categories
                                                    </span>
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item >
                                                <Link to={"/faq/questions"}>
                                                    <i className="fa fa-question"></i>
                                                    <span className='submenu'>
                                                        Questions
                                                    </span>
                                                </Link>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>


                            </ul>
                        </div>
                    </nav>
                    
                </aside>

                
            );
};

export default Sidebar;
