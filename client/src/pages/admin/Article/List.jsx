import { useEffect, useState } from "react";

import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Breadcrumbs from '../../../components/Breacrumbs/Breadcrumbs';

import DataTable from 'react-data-table-component';

import dateFormat from "dateformat";

import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const List = () => 
{
    const handleViewButtonClick = (id) =>
    {
        window.location = process.env.REACT_APP_CLIENT_URL + '/article/view/' + id;
    }

    const handleAddButtonClick = () =>
    {
        window.location = process.env.REACT_APP_CLIENT_URL + '/article/add/';
    }

    const handleEditButtonClick = (id) =>
    {
    //   console.log(id);
        window.location = process.env.REACT_APP_CLIENT_URL + '/article/edit/' + id;
    }

    const handleDelete = async (id) =>
    {
        const url = process.env.REACT_APP_SERVER_URL + '/api/article/delete/' + id

        const res = await axios.delete(url);

        // console.log(res.status);

        if(res.status === 200)
        {

            toast.success('Article Deleted Successfully !');
            setTimeout(() => {
                window.location.href = `/categories`;    
            }, 1000);

        }
    };

    const handleDeleteButtonClick = async (id) =>
    {
        console.log(id);

        // handleShow();

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => handleDelete(id)
              },
              {
                label: 'No',
                // onClick: () => onClose()
              }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "overlay-custom-class-name"
          });

        

    }
    
    const columns = [
   
      {
          name: 'Title',
          selector: row => row.title,
          width: "150px" 
      },
      {
          name: 'Slug',
          selector: row => row.slug,
          width: "150px" 
      },
      {
          name: 'Short Text',
          selector: row => row.short_text,
          width: "200px" 
        },
        {
            name: 'Category',
           
            selector: row => row.category.map(d => {
                return d.name
            }),
            width: "100px" 
        },
        {
            name: 'Tags',
           
            cell: (row) => row.tags.map((t, index )=> 
            {
                // if(index >= row.tags.length - 1)
                {
                    return <span key={t._id} className="highlight_blue"> { t.name } </span>
                }
                // else
                // {
                //     return <span className="highlight_blue"> { t.name + ", " } </span>
                // }
            }),
            width: "200px" 
        },
      {
          name: 'Created At',
          selector: row =>  dateFormat(row.created_at, "mmmm dS, yyyy, h:MM:ss TT") ,
          width: "200px" 
      },
      {
        name:"Action",
        cell: (row) => (
            <>
                <span onClick={() => handleViewButtonClick(row._id)} className='action_icon'>
                    <i className="fa fa-eye fa-2x" style={{color: "#008000ba"}} title='View'></i>
                </span>
                <span onClick={() => handleEditButtonClick(row._id)} className='action_icon'>
                    <i className="fa fa-edit fa-2x" style={{color: "#84d8fa"}} title='Edit'></i>
                </span>
                {/* <span onClick={() => handleShow()}  className='action_icon'> */}
                <span onClick={() => handleDeleteButtonClick(row._id)}  className='action_icon'>
                    <i className="fa fa-trash fa-2x" style={{color: "#d65139"}} title='Delete'></i>
                </span>

                
            </>
        ),
    
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
    ];


    const [role, setRole] = useState();
    const [articleList, setArticleList] = useState();

    const getArticles = async () => 
    {
       
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/article/list")
        const data = await response.json()

        setArticleList(data)

        // data.map(d => {
        //     console.log(d.tags);
        // })

        console.log(data);

    }

    useEffect(() => {
        
		  const token = (localStorage.getItem('token'));

        if(token)
        {
            const role = (localStorage.getItem('role'));

            if(role == 1)
            {
                setRole(role);
                getArticles();

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
									<Breadcrumbs breadcrumbs='Articles' title='Articles' />
                                    <ToastContainer />

									<div className="content mt-3">

                                        <button className='btn btn-primary'  onClick={() => handleAddButtonClick()}>Add Article</button>

                                        {articleList && articleList.length > 0 ? (
                                            <>
                                                <DataTable title="Articles List" columns={columns} data={articleList} pagination />
                                            </>
                                        ):(
                                                null
                                        )}
                                    </div>
                                </div>
                            </>
                        :
                            null
                    }

                </>
    );
}



export default List;