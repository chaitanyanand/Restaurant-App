import React, { Component } from 'react';

import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import {
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem({ dish, onClick }) {
    return (
        <Card>
            <Link to={`/menu/${dish._id}`} >
                <CardImg width="200px" height="400px" src={baseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}


class Menu extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isaddDishOpen: false,

        };
        this.toggleAddDishModal = this.toggleAddDishModal.bind(this);
        this.handleAddDish = this.handleAddDish.bind(this);

    }
    toggleAddDishModal() {
        this.setState({
            isaddDishOpen: !this.state.isaddDishOpen
        })
    }

    handleAddDish(event) {

        this.toggleAddDishModal();
        var newDish = {
            name: this.name.value,
            description: this.description.value,
            category: this.category.value,
            image: this.image.value,
            price: this.price.value,
            label: this.label.value,
            featured: this.featured.value
        }

        this.props.postDish(newDish);
        event.preventDefault();

    }



    render() {
        const menu = this.props.dishes.dishes.map((dish) => {
            return (
                <div key={dish._id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish={dish} />
                </div>
            );
        });
        if (this.props.dishes.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.dishes.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.dishes.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
            return (<div className="container" >
                <div className="row">

                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    {this.props.isAdmin ? <Button className="btn btn-success ml-4" onClick={this.toggleAddDishModal}>
                        Add dish
                    </Button> : <div></div>}
                </div>
                <div className="row">
                    {menu}
                </div>
                <Modal isOpen={this.state.isaddDishOpen} toggle={this.toggleAddDishModal}>
                    <ModalHeader toggle={this.toggleAddDishModal}>Add Dish</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleAddDish} >
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
                                <Label htmlFor="category">category</Label>
                                <Input type="text" id="category" name="category"
                                    innerRef={(input) => this.category = input} />
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

export default Menu;