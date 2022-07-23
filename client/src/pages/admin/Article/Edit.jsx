import { useEffect, useState } from "react";

import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Breadcrumbs from '../../../components/Breacrumbs/Breadcrumbs';

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
		slug: "",
        short_text: "",
        full_text: "",
        category: "",
        tags: ""

	});

    const [categoryList, setCategoryList] = useState();
    const [tagsList, setTagsList] = useState();

    const params = useParams();
    const id = params.id;

	const [error, setError] = useState("");
	const navigation = useNavigate();
    
    const handleChange = ({ currentTarget: input }) => {
        // console.log(input.value);
		setData({ ...data, [input.name]: input.value });
	};

    const [categoryID, setCategoryID] = useState();
    const [tagsID, setTagsID] = useState([]);
    
    const getArticle = async () => 
    {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/article/view/" + id)
        const tags_response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/article/tags/" + id)
        
        const data = await response.json()
        setData(data);

        const tags = await tags_response.json();

        var tags_list = tags.map(function(convArray){
            return convArray._id
        });
        
        // setTagsID(['62d016b47710e17a3a153674', '62d016a97710e17a3a15366e']);
        setTagsID(tags_list);

        
        data.category.map((d) => 
        {
            setCategoryID(d._id);
        })
        
        // data.tags.map((t) => 
        // {
        //     setTagsID([...tagsID, t._id]);
            
        // })

    }
    
    const getCategories = async () => 
    {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/list")
        const data = await response.json()

        setCategoryList(data)
    }

    const getTags = async () => 
    {
       
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/tags/list")
        const data = await response.json()

        setTagsList(data);
       
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
                getCategories();
                getTags();
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

            const url = process.env.REACT_APP_SERVER_URL + '/api/article/update/' + id;

            // console.log([data, url]);
            
            delete data._id;
            delete data.updated_at;
            delete data.created_at;           
            delete data.__v;
            delete data.status;

            
            // console.log(data);

			const res = await axios.put(url, data);
			
            toast.success('Tags Updated Successfully !');
            setTimeout(() => {
                navigation("/article", { replace: true });;
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
									<Breadcrumbs breadcrumbs='Tags/Edit' title='Edit Tag' />
                                    <ToastContainer />

									<div className='col-sm-12 form-div'>
                        
                                        <div className="col-lg-2">&nbsp;</div>
                                        <div className="col-lg-8">
                                            <div className="card">
                                                <div className="card-header">
                                                    <strong><i className="fa fa-user"></i> Edit Tag</strong> 
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

                                                        <div className="row form-group mb-10">
                                                            <div className="col col-md-3"><label htmlFor="slug" className=" form-control-label">Slug</label></div>
                                                            <div className="col-12 col-md-9">
                                                                <input 
                                                                    type="text" 
                                                                    id="slug" 
                                                                    name="slug" 
                                                                    placeholder="Enter Last Name" 
                                                                    className="form-control" 
                                                                    onChange={handleChange} 
                                                                    defaultValue={data.slug}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="row form-group mb-10">
                                                            <div className="col col-md-3"><label htmlFor="short_text" className=" form-control-label">Short Text</label></div>
                                                            <div className="col-12 col-md-9">
                                                                <textarea 
                                                                    id="short_text" 
                                                                    name="short_text" 
                                                                    placeholder="Enter Short Text" 
                                                                    className="form-control" 
                                                                    onChange={handleChange} 
                                                                    defaultValue={data.short_text}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="row form-group mb-10">
                                                            <div className="col col-md-3"><label htmlFor="full_text" className=" form-control-label">Full Text</label></div>
                                                            <div className="col-12 col-md-9">
                                                                <textarea 
                                                                    id="full_text" 
                                                                    name="full_text" 
                                                                    rows={7}
                                                                    placeholder="Enter Short Text" 
                                                                    className="form-control" 
                                                                    onChange={handleChange} 
                                                                    defaultValue={data.full_text}
                                                                />
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="row form-group mb-10">
                                                            <div className="col col-md-3"><label htmlFor="category" className=" form-control-label">Category</label></div>
                                                            <div className="col-12 col-md-9">
                                                                <select 
                                                                    id="category" 
                                                                    name="category" 
                                                                    className="form-control" 
                                                                    value={categoryID}
                                                                    onChange={handleChange} 
                                                                >
                                                                    <option  >Select Category</option>
                                                                    {
                                                                        categoryList?.map((category) => (
                                                                            <option 
                                                                                key={category._id} 
                                                                                value={category._id}
                                                                            >
                                                                                {category.name}
                                                                            </option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        

                                                        
                                                        <div className="row form-group mb-10">
                                                            <div className="col col-md-3"><label htmlFor="tags" className=" form-control-label">Category</label></div>
                                                            <div className="col-12 col-md-9">
                                                                <select 
                                                                    id="tags" 
                                                                    name="tags" 
                                                                    className="form-control" 
                                                                    value={tagsID}
                                                                    onChange={handleChange} 
                                                                    multiple={true}
                                                                >
                                                                    <option  >Select Tags</option>
                                                                    {
                                                                        tagsList?.map((tag) => (
                                                                            <option 
                                                                                key={tag._id} 
                                                                                value={tag._id}
                                                                            >
                                                                                {tag.name}
                                                                            </option>
                                                                        ))
                                                                    }
                                                                </select>
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