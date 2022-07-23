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
        window.location = process.env.REACT_APP_CLIENT_URL + '/tags/view/' + id;
    }

    const handleAddButtonClick = () =>
    {
        window.location = process.env.REACT_APP_CLIENT_URL + '/tags/add/';
    }

    const handleEditButtonClick = (id) =>
    {
    //   console.log(id);
        window.location = process.env.REACT_APP_CLIENT_URL + '/tags/edit/' + id;
    }

    const handleDelete = async (id) =>
    {
        const url = process.env.REACT_APP_SERVER_URL + '/api/tags/delete/' + id

        const res = await axios.delete(url);

        // console.log(res.status);

        if(res.status === 200)
        {

            toast.success('Tags Deleted Successfully !');
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
          name: 'Name',
          selector: row => row.name,
      },
      {
          name: 'Slug',
          selector: row => row.slug,
      },
      {
          name: 'Created At',
          selector: row =>  dateFormat(row.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT") ,
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
    const [tagsList, setTagsList] = useState();

    const getTags = async () => 
    {
       
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/tags/list")
        const data = await response.json()

        setTagsList(data)

        // console.log(data);

    }

    useEffect(() => {
        
		  const token = (localStorage.getItem('token'));

        if(token)
        {
            const role = (localStorage.getItem('role'));

            if(role == 1)
            {
                setRole(role);
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


    return (
                <>
                    { 
						role === '1' ?  
							<>
								<Sidebar />

								<div id="right-panel" className="right-panel">
									<Header /> 
									<Breadcrumbs breadcrumbs='Tags' title='Tags' />
                                    <ToastContainer />

									<div className="content mt-3">

                                        <button className='btn btn-primary'  onClick={() => handleAddButtonClick()}>Add Tags</button>

                                        {tagsList && tagsList.length > 0 ? (
                                            <>
                                                <DataTable title="Tags List" columns={columns} data={tagsList} pagination />
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