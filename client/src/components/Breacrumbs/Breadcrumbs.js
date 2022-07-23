import React from 'react';
import './Breadcrumbs.css';

const Breadcrumbs = (props) => {
    return (
        
        <div className="breadcrumbs">
            <div className="col-sm-4">
                <div className="page-header float-left">
                    <div className="page-title">
                        <h1>{props.title}</h1>
                    </div>
                </div>
            </div>
            <div className="col-sm-8">
                <div className="page-header float-right">
                    <div className="page-title">
                        <ol className="breadcrumb text-right">
                            <li className="active">{props.breadcrumbs}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumbs;
