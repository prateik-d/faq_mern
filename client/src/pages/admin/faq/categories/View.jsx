import { useEffect, useState } from "react";

import Header from '../../../../components/Header/Header';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import Breadcrumbs from '../../../../components/Breacrumbs/Breadcrumbs';

import { useParams } from 'react-router-dom';

import dateFormat from "dateformat";


const View = () => 
{
    
    const [role, setRole] = useState();
    const [faqCategory, setFaqCategory] = useState();

    const params = useParams()
    const id = params.id;


    const getFaqCategory = async () => 
    {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/faq/categories/view/" + id)
        const data = await response.json()

        setFaqCategory(data);

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
                getFaqCategory();

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
									<Breadcrumbs breadcrumbs='Tags/View' title='View Tags' />

									<div className="content mt-3">

                                        {
                                            faqCategory &&

                                                <div className="container mt-5">
            
                                                    <div className="row d-flex justify-content-center">
                                                        
                                                        <div className="col-md-7">
                                                            
                                                            <div className="card p-3 py-4">
                                                                
                                                                <div className="text-left mt-3">
                                                                    
                                                                    <div className="px-4 mt-1">
                                                                        <h4>
                                                                            <p>
                                                                                <strong>Title :</strong>  
                                                                                { faqCategory.title }
                                                                            </p>
                                                                        </h4>
                                                                       
                                                                        <h4>
                                                                            <p>
                                                                                <strong>Created At : </strong>
                                                                                { dateFormat(faqCategory.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT") }
                                                                            </p>
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