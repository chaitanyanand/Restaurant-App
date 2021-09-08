import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col, Input, Form, FormGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

class RenderDish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdateDishOpen: false,

        };
        this.toggleUpdateDishModal = this.toggleUpdateDishModal.bind(this);
        this.handleUpdateDish = this.handleUpdateDish.bind(this);

    }
    toggleUpdateDishModal() {
        this.setState({
            isUpdateDishOpen: !this.state.isUpdateDishOpen
        })
    }

    handleUpdateDish(event) {

        this.toggleUpdateDishModal();
        var Dish = {
            name: this.name.value,
            description: this.description.value,
            category: this.category.value,
            image: this.image.value,
            price: this.price.value,
            label: this.label.value,
            featured: this.featured.value
        }

        var newDish = {};
        for (let x in Dish) {
            console.log(Dish[x]);
            if (Dish[x]) {
                newDish[x] = Dish[x];
            }
        }
        this.props.updateDish(this.props.dish._id, newDish);
        event.preventDefault();

    }
    render() {

        return (
            <div className="col-12 col-md-5 m-1">
                {this.props.isAdmin ? <Button outline color="danger" onClick={() => this.props.deleteDish(this.props.dish._id)}>
                    <span className="fa fa-times"></span> Delete
                </Button> : <div></div>}
                {this.props.isAdmin ? <Button outline color="primary" onClick={this.toggleUpdateDishModal}>
                    Update
                </Button> : <div></div>}
                <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg style={{ height: '30rem' }} top src={baseUrl + this.props.dish.image} alt={this.props.dish.name} />
                        <CardImgOverlay>
                            <Button outline color="primary" onClick={() => this.props.favorite ? console.log('Already favorite') : this.props.postFavorite(this.props.dish._id)}>
                                {this.props.favorite ?
                                    <span className="fa fa-heart"></span>
                                    :
                                    <span className="fa fa-heart-o"></span>
                                }
                            </Button>
                        </CardImgOverlay>
                        <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
                <Modal isOpen={this.state.isUpdateDishOpen} toggle={this.toggleUpdateDishModal}>
                    <ModalHeader toggle={this.toggleUpdateDishModal}>Enter only the fields you want to Update in the Dish</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleUpdateDish} >
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

                            <Button type="submit" value="submit" color="primary">Update</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );

    }

}

function RenderComments({ comments, postComment, deleteComment, dishId }) {
    if (comments != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in key={comment._id}>
                                    <li>
                                        <div className='row mt-3'>
                                            <div className='col-8'>
                                                <p>{comment.comment}</p>
                                                <p>{comment.rating} stars</p>
                                                <p>-- {comment.author.firstname} {comment.author.lastname} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.updatedAt)))}</p>
                                            </div>
                                            <div className='col-4'>
                                                <Button outline color="danger" onClick={() => deleteComment(comment._id)}>
                                                    <span className="fa fa-times"></span>
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    else
        return (
            <div></div>
        );
}

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.comment);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment"
                                        rows="6" className="form-control" />
                                </Col>
                            </Row>
                            <Button type="submit" className="bg-primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

const DishDetail = (props) => {
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
    else if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} isAdmin={props.isAdmin} favorite={props.favorite} postFavorite={props.postFavorite} deleteDish={props.deleteDish} updateDish={props.updateDish} />
                    {!props.isAdmin ? <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        deleteComment={props.deleteComment}
                        dishId={props.dish._id} /> : <div></div>}
                </div>
            </div>
        );
    else
        return (
            <div></div>
        );
}

export default DishDetail;