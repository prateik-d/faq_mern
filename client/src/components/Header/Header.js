import React from 'react';
import './Header.css';
import adminImage from '../../assets/images/admin.jpg';
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {

    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};


    return (
        
            <header id="header" className="header">

                <div className="header-menu">

                    <div className="col-sm-7 search">
                        <a href={adminImage} id="menuToggle" className="menutoggle pull-left"><i className="fa fa fa-tasks"></i></a>
                        
                    </div> 

                    <div className="col-sm-5">

                        <div className="user-area dropdown float-right">
                            
                            <Dropdown>
                                <Dropdown.Toggle>
                                <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img className="user-avatar rounded-circle" src={ adminImage } alt="User Avatar" />
                                </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <a className="nav-link" href="sdff"><i className="fa fa-user"></i> My Profile</a>
                                    </Dropdown.Item>
                                    <Dropdown.Item >
                                        <a className="nav-link" href="sdf"><i className="fa fa-cog"></i> Settings</a>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <a className="nav-link" onClick={handleLogout}><i className="fa fa-power-off"></i> Logout</a>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </header>
    );
};

export default Header;