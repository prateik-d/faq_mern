import { useEffect, useState } from "react";

import Header from '../../../../components/Header/Header';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import Breadcrumbs from '../../../../components/Breacrumbs/Breadcrumbs';

import { useParams } from 'react-router-dom';

import dateFormat from "dateformat";



const View = () => 
{
    
    const [role, setRole] = useState();
    const [question, setFaqQuestion] = useState();

    const params = useParams()
    const id = params.id;


    const getQuestion = async () => 
    {
       
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/faq/questions/view/" + id)
        const data = await response.json()

        setFaqQuestion(data);

        console.log(data);
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
                getQuestion();

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
									<Breadcrumbs breadcrumbs='FAQ/Question/View' title='View Question' />

									<div className="content mt-3">

                                        {
                                            question &&

                                                <div className="container mt-5">
            
                                                    <div className="row d-flex justify-content-center">
                                                        
                                                        <div className="col-md-7">
                                                            
                                                            <div className="card p-3 py-4">
                                                                
                                                                <div className="text-left mt-3">
                                                                    
                                                                    <div className="px-4 mt-1">
                                                                        <h4>
                                                                            <p>
                                                                                <strong>Title :</strong>  
                                                                                { question.title }
                                                                            </p>
                                                                        </h4>
                                                                        <h4>
                                                                            <p>
                                                                                <strong>Category :</strong>
                                                                                {
                                                                                    question.category.map(d => {
                                                                                        return (d.title)
                                                                                    })

                                                                                }
                                                                            </p>
                                                                        </h4>
                                                                        
                                                                        <h4>
                                                                            <p>
                                                                                <strong>Created At : </strong>
                                                                                { dateFormat(question.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT") }
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