import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, Label, Input, Form, FormGroup, Modal, ModalHeader, ModalBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, } from 'react-animation-components';

class Renderpromo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdatePromoModalOpen: false,

        };
        this.toggleUpdatePromoModal = this.toggleUpdatePromoModal.bind(this);
        this.handleUpdatePromo = this.handleUpdatePromo.bind(this);

    }
    toggleUpdatePromoModal() {
        this.setState({
            isUpdatePromoModalOpen: !this.state.isUpdatePromoModalOpen
        })
    }

    handleUpdatePromo(event) {

        this.toggleUpdatePromoModal();
        var promo = {
            name: this.name.value,
            description: this.description.value,
            image: this.image.value,
            price: this.price.value,
            label: this.label.value,
            featured: this.featured.value
        }

        var newpromo = {};
        for (let x in promo) {
            console.log(promo[x]);
            if (promo[x]) {
                newpromo[x] = promo[x];
            }
        }
        this.props.updatePromo(this.props.promo._id, newpromo);
        event.preventDefault();

    }
    render() {
        return (
            <div className="col-12 col-md-5 m-1">
                <Button outline color="danger" onClick={() => this.props.deletepromo(this.props.promo._id)}>
                    <span className="fa fa-times"></span> Delete
                </Button>
                <Button outline color="primary" onClick={this.toggleUpdatePromoModal}>
                    Update
                </Button>
                <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg style={{ height: '30rem' }} top src={baseUrl + this.props.promo.image} alt={this.props.promo.name} />
                        <CardBody>
                            <CardTitle>{this.props.promo.name}</CardTitle>
                            <CardText>{this.props.promo.designation}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
                <Modal isOpen={this.state.isUpdatePromoModalOpen} toggle={this.toggleUpdatePromoModal}>
                    <ModalHeader toggle={this.toggleUpdatePromoModal}>Enter Fields that you want to update in the promotion </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleUpdatePromo}>
                            <FormGroup>
                                <Label htmlFor="name">name</Label>
                                <Input type="text" id="name" name="name"
                                    innerRef={(input) => this.name = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="description">description</Label>
                                <Input type="text" id="description" name="description"
                                    innerRef={(input) => this.description = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="image">image</Label>
                                <Input type="text" id="image" name="image"
                                    innerRef={(input) => this.image = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="price">price</Label>
                                <Input type="text" id="price" name="price"
                                    innerRef={(input) => this.price = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="label">label</Label>
                                <Input type="text" id="label" name="label"
                                    innerRef={(input) => this.label = input} />
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

const PromoDetail = (props) => {
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
    else if (props.promo != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/promos'>promo</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.promo.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.promo.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <Renderpromo promo={props.promo} deletepromo={props.deletePromo} updatePromo={props.updatePromo} />
                </div>
            </div>
        );
    else
        return (
            <div></div>
        );
}

export default PromoDetail;