import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, Label, Input, Form, FormGroup, Modal, ModalHeader, ModalBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, } from 'react-animation-components';

class RenderLeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdateLeaderModelOpen: false,

        };
        this.toggleUpdateLeaderModal = this.toggleUpdateLeaderModal.bind(this);
        this.handleUpdateLeader = this.handleUpdateLeader.bind(this);

    }
    toggleUpdateLeaderModal() {
        this.setState({
            isUpdateLeaderModelOpen: !this.state.isUpdateLeaderModelOpen
        })
    }

    handleUpdateLeader(event) {

        this.toggleUpdateLeaderModal();
        var Leader = {
            name: this.name.value,
            designation: this.designation.value,
            description: this.description.value,
            image: this.image.value,
            abbr: this.abbr.value,
            featured: this.featured.value
        }

        var newLeader = {};
        for (let x in Leader) {
            console.log(Leader[x]);
            if (Leader[x]) {
                newLeader[x] = Leader[x];
            }
        }
        this.props.updateLeader(this.props.leader._id, newLeader);
        event.preventDefault();

    }
    render() {
        return (
            <div className="col-12 col-md-5 m-1">
                <Button outline color="danger" onClick={() => this.props.deleteLeader(this.props.leader._id)}>
                    <span className="fa fa-times"></span> Delete
                </Button>
                <Button outline color="primary" onClick={this.toggleUpdateLeaderModal}>
                    Update
                </Button>
                <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg style={{ height: '30rem' }} top src={baseUrl + this.props.leader.image} alt={this.props.leader.name} />
                        <CardBody>
                            <CardTitle>{this.props.leader.name}</CardTitle>
                            <CardText>{this.props.leader.designation}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
                <Modal isOpen={this.state.isUpdateLeaderModelOpen} toggle={this.toggleUpdateLeaderModal}>
                    <ModalHeader toggle={this.toggleUpdateLeaderModal}>Enter fields that you want to update in the leader</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleUpdateLeader}>
                            <FormGroup>
                                <Label htmlFor="name">name</Label>
                                <Input type="text" id="name" name="name"
                                    innerRef={(input) => this.name = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="designation">designation</Label>
                                <Input type="text" id="designation" name="designation"
                                    innerRef={(input) => this.designation = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="image">image</Label>
                                <Input type="text" id="image" name="image"
                                    innerRef={(input) => this.image = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="abbr">abbr</Label>
                                <Input type="text" id="abbr" name="abbr"
                                    innerRef={(input) => this.abbr = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="description">description</Label>
                                <Input type="text" id="description" name="description"
                                    innerRef={(input) => this.description = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="featured">featured</Label>
                                <Input type="text" id="featured" name="featured"
                                    innerRef={(input) => this.featured = input} />
                            </FormGroup>

                            <Button type="submit" value="submit" color="primary">Update</Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </div>

        );


    }

}

const LeaderDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.leader != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/leaders'>Leaders</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.leader.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.leader.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderLeader leader={props.leader} deleteLeader={props.deleteLeader} updateLeader={props.updateLeader} />
                </div>
            </div>
        );
    else
        return (
            <div></div>
        );
}

export default LeaderDetail;