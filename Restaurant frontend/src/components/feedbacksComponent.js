import React, { Component } from 'react';

import { Card, CardBody, } from 'reactstrap';


import { baseUrl } from '../shared/baseUrl';

function RenderfeedbacksItem({ feedback }) {
    return (
        <div className="row row-content">
            <div className="col-md-6 ">
                <div className="col-12 ">
                    <Card>

                        <CardBody>
                            <dl className="row p-1">

                                <dt className="col-6">firstname</dt>
                                <dd className="col-6">{feedback.firstname}</dd>
                                <dt className="col-6">lastname</dt>
                                <dd className="col-6">{feedback.lastname}</dd>
                                <dt className="col-6">telnum</dt>
                                <dd className="col-6">{feedback.telnum}</dd>
                                <dt className="col-6">email</dt>
                                <dd className="col-6">{feedback.email}</dd>
                                <dt className="col-6">Agree to contact?</dt>
                                <dd className="col-6">{feedback.agree ? "true" : "false"}</dd>
                                <dt className="col-6">ContactType</dt>
                                <dd className="col-6">{feedback.contactType}</dd>
                                <dt className="col-6">message</dt>
                                <dd className="col-6">{feedback.message}</dd>

                            </dl>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>

    );
}


class Feedbacks extends Component {
    constructor(props) {
        super(props);
        this.state = { feedbacks: [] }
    }

    componentDidMount() {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl + 'feedback', {
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
            .then(response => this.setState({ feedbacks: response }))
            .catch(error => {
                console.log('fetch feedbacks ', error.message);
                alert('feedback could not be fetched\nError: ' + error.message);
            })
    }



    render() {

        const feedbacks = this.state.feedbacks.map((feedback) => {
            return (
                <RenderfeedbacksItem key={feedback._id} feedback={feedback} />
            );
        });
        return (<div className="container" >

            <div className="row">
                <h3>feedbacks</h3>
                <div>
                    {feedbacks}
                </div>

            </div>

        </div>
        )
    }

}

export default Feedbacks;