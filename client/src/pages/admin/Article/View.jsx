import { useEffect, useState } from "react";

import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Breadcrumbs from '../../../components/Breacrumbs/Breadcrumbs';

import { useParams } from 'react-router-dom';

import dateFormat from "dateformat";



const View = () => 
{
    
    const [role, setRole] = useState();
    const [article, setArticle] = useState();

    const params = useParams()
    const id = params.id;


    const getArticle = async () => 
    {
       
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/article/view/" + id)
        const data = await response.json()

        setArticle(data);

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
                getArticle();

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
                                            article &&

                                                <div className="container mt-5">
            
                                                    <div className="row d-flex justify-content-center">
                                                        
                                                        <div className="col-md-7">
                                                            
                                                            <div className="card p-3 py-4">
                                                                
                                                                <div className="text-left mt-3">
                                                                    
                                                                    <div className="px-4 mt-1">
                                                                        <h4>
                                                                            <p>
                                                                                <strong>Title :</strong>  
                                                                                { article.title }
                                                                            </p>
                                                                        </h4>
                                                                        <h4>
                                                                            <p>
                                                                                <strong>Slug :</strong> 
                                                                                { article.slug }
                                                                            </p>
                                                                        </h4>
                                                                        <h4>
                                                                            <p>
                                                                                <strong>Short Text :</strong>
                                                                                { article.short_text }
                                                                            </p>
                                                                        </h4>
                                                                        <h4>
                                                                            <p>
                                                                                <strong>Full Text :</strong>
                                                                                { article.full_text }
                                                                            </p>
                                                                        </h4>
                                                                        <h4>
                                                                            <p>
                                                                                <strong>Category :</strong>
                                                                                {
                                                                                    article.category.map(d => {
                                                                                        return (d.name)
                                                                                    })

                                                                                }
                                                                            </p>
                                                                        </h4>
                                                                        <h4>
                                                                            <p>
                                                                                <strong>Tags :</strong>
                                                                                {
                                                                                    article.tags.map((d, index) => 
                                                                                    {
                                                                                        if(index >= article.tags.length - 1)
                                                                                        {
                                                                                            return d.name 
                                                                                        }
                                                                                        else
                                                                                        {
                                                                                            return d.name + ", "
                                                                                        }
                                                                                    })
                                                                                }
                                                                            </p>
                                                                        </h4>
                                                                        <h4>
                                                                            <p>
                                                                                <strong>Created At : </strong>
                                                                                { dateFormat(article.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT") }
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