import { useEffect, useState } from "react";

import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Breadcrumbs from '../../../components/Breacrumbs/Breadcrumbs';

import { Button } from 'react-bootstrap';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const Add = () => 
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
    
	const [error, setError] = useState("");
	const navigation = useNavigate();

    const [selectedTags, setSelectedTags] = useState([]);

    const handleSelectTags = function(selectedItems) {
        const tags = [];
        for (let i = 0; i < selectedItems.length; i++) 
        {
            tags.push( selectedItems[i].value);
        }
        setSelectedTags(tags);
        
        setData({ ...data,  tags});
    }
 

    const handleChange = ({ currentTarget: input }) => {
        // console.log([input.name, input.value]);
		setData({ ...data, [input.name]: input.value });
        // console.log(data);
	};

    
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
        
        // const options = data.map(d => ({
        //     "value" : d._id,
        //     "label" : d.name
        // }));
        
        // setTagsList(options);
        // setSelectTagsList({selectOptions: options})

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

            const url = process.env.REACT_APP_SERVER_URL + '/api/article'

            // console.log(data);

			const { data: res } = await axios.post(url, data);
			
            toast.success('Article Added Successfully !');
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
									<Breadcrumbs breadcrumbs='Articles/Add' title='Add Article' />
                                    <ToastContainer />

									<div className='col-sm-12 form-div'>
                        
                                        <div className="col-lg-2">&nbsp;</div>
                                        <div className="col-lg-8">
                                            <div className="card">
                                                <div className="card-header">
                                                    <strong><i className="fa fa-user"></i> Add Article</strong> 
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
                                                                    defaultValue='0'
                                                                    onChange={handleChange} 
                                                                >
                                                                    <option value='0' disabled>Select Category</option>
                                                                    {
                                                                        categoryList?.map((category) => (
                                                                            <option key={category._id} value={category._id}>{category.name}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="row form-group mb-10">
                                                            <div className="col col-md-3"><label htmlFor="tag" className=" form-control-label">Tags</label></div>
                                                            <div className="col-12 col-md-9">
                                                                
                                                                <select 
                                                                    id="tags" 
                                                                    name="tags"  
                                                                    className="form-control"
                                                                    
                                                                    multiple={[true]}
                                                                    value={selectedTags} 
                                                                    onChange={(e)=> {handleSelectTags(e.target.selectedOptions)}}

                                                                >
                                                                
                                                                    <option value='0' disabled>Select Tags</option>
                                                                    {
                                                                        tagsList?.map((tag) => (
                                                                            <option key={tag._id} value={tag._id}>{tag.name}</option>
                                                                        ))
                                                                    }
                                                                </select>

                                                                {/* <Select
                                                                    name="tags"
                                                                    placeholder="Tags"
                                                                    options={tagsList}
                                                                    multi={true}
                                                                /> */}

                                                                {/* react-select */}

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



export default Add;