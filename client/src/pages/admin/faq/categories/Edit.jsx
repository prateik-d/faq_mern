import { useEffect, useState } from "react";

import Header from '../../../../components/Header/Header';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import Breadcrumbs from '../../../../components/Breacrumbs/Breadcrumbs';

import { Button } from 'react-bootstrap';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => 
{
      
    const [role, setRole] = useState();

    const [data, setData] = useState({
		title: "",
	});

    const params = useParams();
    const id = params.id;

	const [error, setError] = useState("");
	const navigation = useNavigate();
    
    const handleChange = ({ currentTarget: input }) => {
        // console.log(input.value);
		setData({ ...data, [input.name]: input.value });
	};

    const getFaqCategory = async () => 
    {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/faq/categories/view/" + id)

        const data = await response.json()
        setData(data);

    }
    


    useEffect(() => 
    {
        
		const token = (localStorage.getItem('token'));

        if(token)
        {
            const role = (localStorage.getItem('role'));

            if(role === '1')
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

    const submitForm = async (e) =>
    {
        e.preventDefault();
		try {
            setError('');

            const url = process.env.REACT_APP_SERVER_URL + '/api/faq/categories/update/' + id;

            // console.log([data, url]);
            
            delete data._id;
            delete data.updated_at;
            delete data.created_at;           
            delete data.__v;
            delete data.status;

            // console.log(data);

			const res = await axios.put(url, data);
			
            toast.success('Categories Updated Successfully !');
            setTimeout(() => {
                navigation("/faq/categories", { replace: true });;
            }, 1000);

        } catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
    }


    return (
                <>
                    { 
						role === '1' ?  
							<>
								<Sidebar />

								<div id="right-panel" className="right-panel">
									<Header /> 
									<Breadcrumbs breadcrumbs='FAQ/Catgory/Edit' title='Edit Catgory' />
                                    <ToastContainer />

									<div className='col-sm-12 form-div'>
                        
                                        <div className="col-lg-2">&nbsp;</div>
                                        <div className="col-lg-8">
                                            <div className="card">
                                                <div className="card-header">
                                                    <strong><i className="fa fa-user"></i> Edit Catgory</strong> 
                                                </div>
                                                <div className="card-body card-block">
                                                    <form action="" method="post"  className="form-horizontal"  onSubmit={submitForm}>
                                                     
                                                        <div className="row form-group mb-10">
                                                            <div className="col col-md-3"><label htmlFor="title" className=" form-control-label">Title</label></div>
                                                            <div className="col-12 col-md-9">
                                                                <input 
                                                                    type="text" 
                                                                    id="title" 
                                                                    name="title" 
                                                                    placeholder="Enter Title" 
                                                                    className="form-control" 
                                                                    onChange={handleChange} 
                                                                    defaultValue={data.title}
                                                                />
                                                            </div>
                                                        </div>

                                                        <br />
                                                        {/* <hr /> */}
                                                       
                                                        {error && <div className="error_msg">{error}</div>}

                                                        <div className="footer">
                                                            <Button type="submit" className="btn btn-primary btn-sm">
                                                                <i className="fa fa-dot-circle-o"></i> Submit
                                                            </Button>
                                                            <Button type="reset" className="btn btn-danger btn-sm">
                                                                <i className="fa fa-ban"></i> Reset
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                            </>
                        :
                            null
                    }

                </>
    );
}



export default Edit;