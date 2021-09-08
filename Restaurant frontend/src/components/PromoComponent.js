import React, { Component } from 'react';

import { Card, CardImg, CardImgOverlay, CardTitle, } from 'reactstrap';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderPromosItem({ promo, onClick }) {
    return (
        <Card>
            <Link to={`/promos/${promo._id}`} >
                <CardImg width="200px" height="400px" src={baseUrl + promo.image} alt={promo.name} />
                <CardImgOverlay>
                    <CardTitle>{promo.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}


class Promos extends Component {


    constructor(props) {
        super(props);
        this.state = { isaddPromoOpen: false };
        this.toggleAddPromoModal = this.toggleAddPromoModal.bind(this);
        this.handleAddpromo = this.handleAddpromo.bind(this);

    }
    toggleAddPromoModal() {
        this.setState({
            isaddPromoOpen: !this.state.isaddPromoOpen
        })
    }
    handleAddpromo(event) {

        this.toggleAddPromoModal();

        var newpromo = {
            name: this.name.value,
            description: this.description.value,
            image: this.image.value,
            price: this.price.value,
            label: this.label.value,
            featured: this.featured.value
        }
        this.props.postPromo(newpromo);
        event.preventDefault();
    }



    render() {
        const promos = this.props.promos.promos.map((promo) => {
            return (
                <div key={promo._id} className="col-12 col-md-5 m-1">
                    <RenderPromosItem promo={promo} />
                </div>
            );
        });
        if (this.props.promos.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.promos.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.promos.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
            return (<div className="container" >
                <div className="row">

                    <div className="col-12">
                        <h3>promos</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <Button className="btn btn-success ml-4" onClick={this.toggleAddPromoModal}>
                        Add promo
                    </Button>
                </div>
                <div className="row">
                    {promos}
                </div>
                <Modal isOpen={this.state.isaddPromoOpen} toggle={this.toggleAddPromoModal}>
                    <ModalHeader toggle={this.toggleAddPromoModal}>Add promo</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleAddpromo}>
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

                            <Button type="submit" value="submit" color="primary">Add</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
            )
    }

}

export default Promos;