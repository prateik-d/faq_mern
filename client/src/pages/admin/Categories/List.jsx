import { useEffect, useState } from "react";

import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Breadcrumbs from '../../../components/Breacrumbs/Breadcrumbs';


import DataTable from 'react-data-table-component';



const List = () => 
{
      const handleViewButtonClick = (id) =>
      {
        //   console.log(id);
          window.location = process.env.REACT_APP_CLIENT_URL + '/categories/view/' + id;
      }
      
      const handleEditButtonClick = (id) =>
      {
        //   console.log(id);
            window.location = process.env.REACT_APP_CLIENT_URL + '/categories/edit/' + id;
      }

      const handleDeleteButtonClick = (id) =>
      {
          console.log(id);
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
          selector: row => row.created_at,
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
                <span onClick={() => handleDeleteButtonClick(row._id)} className='action_icon'>
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
    const [categoryList, setCategoryList] = useState();

    const getCategories = async () => 
    {
       
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/list")
        const data = await response.json()

        setCategoryList(data)

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
									<Breadcrumbs breadcrumbs='Categories' title='Categories' />

									<div className="content mt-3">
                                        {categoryList && categoryList.length > 0 ? (
                                            <>
                                            
                                              <DataTable title="User List" columns={columns} data={categoryList} pagination />

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