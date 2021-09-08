import React from 'react';

import { Card, Button, CardBody } from 'reactstrap';

import { Loading } from './LoadingComponent';


function RenderTablesItem({ table, deleteTable }) {
    return (
        <div className="row row-content">
            <div className="col-md-6 ">
                <div className="col-12 ">
                    <Card>

                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">name</dt>
                                <dd className="col-6">{table.username}</dd>
                                <dt className="col-6">No Of Guest</dt>
                                <dd className="col-6">{table.no_of_guest}</dd>
                                <dt className="col-6">Date</dt>
                                <dd className="col-6">{table.date}</dd>
                                <dt className="col-6">Time</dt>
                                <dd className="col-6">{table.time}</dd>
                                <dt className="col-6">Phone number</dt>
                                <dd className="col-6">{table.phone_number}</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 ">
                    <Button outline color="danger" onClick={() => deleteTable(table._id)}>
                        <span className="fa fa-times"></span>
                    </Button>
                </div>
            </div>
        </div>

    );
}


const Tables = (props) => {

    const tables = props.tables.tables.map((table) => {
        return (

            <RenderTablesItem table={table} deleteTable={props.deleteTable} />
        );
    });
    if (props.tables.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.tables.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.tables.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (<div className="container" >



            <div className="row">
                <h3>tables</h3>
                <div>
                    {tables}
                </div>

            </div>

        </div>
        )
}



export default Tables;