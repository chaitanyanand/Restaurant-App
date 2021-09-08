import React, { Component } from 'react';

import { Media } from 'reactstrap';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components';

function RenderLeader({ leader }) {
    return (
        <Media tag="li">
            <Link to={`/leader/${leader._id}`} >
                <Media left middle>
                    <Media width="300px" object src={baseUrl + leader.image} alt={leader.name} />
                </Media>
                <Media body className="ml-5">
                    <Media heading>{leader.name}</Media>
                    <p>{leader.designation}</p>
                    <p>{leader.description}</p>
                </Media>
            </Link>
        </Media>

    );

}
function LeaderList(props) {

    const leaders = props.leaders.leaders.map((leader) => {
        return (
            <Fade in key={leader._id}>
                <div className="col-12 mt-2">
                    <RenderLeader leader={leader} />
                </div>
            </Fade>
        );
    });

    if (props.leaders.isLoading) {
        return (
            <Loading />
        );
    }
    else if (props.leaders.errMess) {
        return (
            <div className="col-12">
                <h4>{props.leaders.errMess}</h4>
            </div>
        );
    }
    else {
        return (
            <Media list>
                <Stagger in>
                    {leaders}
                </Stagger>
            </Media>
        );
    }
}


class Leaders extends Component {


    constructor(props) {
        super(props);
        this.state = { isaddleaderOpen: false };
        this.toggleAddleaderModal = this.toggleAddleaderModal.bind(this);
        this.handleAddleader = this.handleAddleader.bind(this);

    }
    toggleAddleaderModal() {
        this.setState({
            isaddleaderOpen: !this.state.isaddleaderOpen
        })
    }
    handleAddleader(event) {

        this.toggleAddleaderModal();

        var newleader = {
            name: this.name.value,
            designation: this.designation.value,
            description: this.description.value,
            image: this.image.value,
            abbr: this.abbr.value,
            featured: this.featured.value
        }
        this.props.postLeader(newleader);
        event.preventDefault();

    }

    render() {

        if (this.props.leaders.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.leaders.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.leaders.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
            return (<div className="container" >
                <div className="row">

                    <div className="col-12">
                        <h3>Leaders</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <Button className="btn btn-success ml-4" onClick={this.toggleAddleaderModal}>
                        Add leader
                    </Button>
                </div>
                <div className="row">
                    <LeaderList leaders={this.props.leaders} />
                </div>
                <Modal isOpen={this.state.isaddleaderOpen} toggle={this.toggleAddleaderModal}>
                    <ModalHeader toggle={this.toggleAddleaderModal}>Add leader</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleAddleader}>
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

                            <Button type="submit" value="submit" color="primary">Add</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
            )
    }


}

export default Leaders;