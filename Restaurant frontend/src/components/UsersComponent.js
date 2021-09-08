import React, { Component } from 'react';

import { Card, CardBody, } from 'reactstrap';


import { baseUrl } from '../shared/baseUrl';

function RenderusersItem({ user }) {
    return (
        <div className="row row-content">
            <div className="col-md-6 ">
                <div className="col-12 ">
                    <Card>

                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">username</dt>
                                <dd className="col-6">{user.username}</dd>
                                <dt className="col-6">firstname</dt>
                                <dd className="col-6">{user.firstname}</dd>
                                <dt className="col-6">lastname</dt>
                                <dd className="col-6">{user.lastname}</dd>
                                <dt className="col-6">UserId</dt>
                                <dd className="col-6">{user._id}</dd>

                            </dl>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>

    );
}


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] }
    }

    componentDidMount() {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            .then(response => this.setState({ users: response }))
            .catch(error => {
                console.log('fetch Users ', error.message);
                alert('User could not be fetched\nError: ' + error.message);
            })
    }



    render() {

        const users = this.state.users.map((user) => {
            return (
                <RenderusersItem user={user} />
            );
        });
        return (<div className="container" >

            <div className="row">
                <h3>users</h3>
                <div>
                    {users}
                </div>

            </div>

        </div>
        )
    }

}

export default Users;