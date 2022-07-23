import { useEffect, useState } from "react";

import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Breadcrumbs from '../../../components/Breacrumbs/Breadcrumbs';

import { useParams } from 'react-router-dom';

import dateFormat from "dateformat";



const View = () => 
{
    
    
    const [role, setRole] = useState();
    const [categories, setCategories] = useState();

    const params = useParams()
    const id = params.id;


    const getCategories = async () => 
    {
       
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/view/" + id)
        const data = await response.json()

        setCategories(data);

        // console.log(data);
    }

    useEffect(() => 
    {    
		const token = (localStorage.getItem('token'));

        if(token)
        {
            const role = (localStorage.getItem('role'));

            if(role == 1)
            {
                setRole(role);
                getCategories();

            }
            else
            {
                window.location = "/";
            }
        }
        else
        {
            window.location = "/";
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
									<Breadcrumbs breadcrumbs='Categories/View' title='View Categories' />

									<div className="content mt-3">

                                        {
                                            categories &&

                                                <div className="container mt-5">
            
                                                    <div className="row d-flex justify-content-center">
                                                        
                                                        <div className="col-md-7">
                                                            
                                                            <div className="card p-3 py-4">
                                                                
                                                                <div className="text-left mt-3">
                                                                    
                                                                    <div className="px-4 mt-1">
                                                                        <h4>Name : { categories.name }</h4>
                                                                        <h4>Slug : { categories.slug }</h4>
                                                                        <h4>
                                                                                Created At : { dateFormat(categories.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT") }
                                                                        </h4>
                                                                        
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </>
                        :
                            null
                    }

                </>
    );
}



export default View;