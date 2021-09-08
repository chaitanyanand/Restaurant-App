import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import fetch from 'isomorphic-fetch';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isReserveModalOpen: false,
            isRegisterModalOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.toggleReserveModal = this.toggleReserveModal.bind(this);
        this.handleReserveTable = this.handleReserveTable.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    toggleReserveModal() {
        this.setState({
            isReserveModalOpen: !this.state.isReserveModalOpen
        });
    }
    toggleRegisterModal() {
        this.setState({
            isRegisterModalOpen: !this.state.isRegisterModalOpen
        });
    }
    handleReserveTable(event) {
        this.toggleReserveModal();
        var newTable = {
            no_of_guest: this.no_of_guest.value,
            phone_number: this.phone_number.value,
            date: this.date.value,
            time: this.time.value
        };
        this.props.postTable(newTable);
        event.preventDefault();

    }
    handleRegister(event) {
        this.toggleRegisterModal();

        const newUser = {
            firstname: this.firstname.value,
            lastname: this.lastname.value,
            username: this.rusername.value,
            password: this.rpassword.value
        }
        console.log('User ', newUser);

        fetch(baseUrl + 'users/signup', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json',
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
            .then(response => alert('You are successfully registered'))
            .catch(error => {
                console.log('Post Users ', error.message);
                alert('Your User could not be posted\nError: ' + error.message);
            })
        event.preventDefault();

    }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({ username: this.username.value, password: this.password.value });
        event.preventDefault();

    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="30" width="41"
                                alt="Happy Restaurant" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                {!this.props.auth.isAdmin ?
                                    <NavItem>
                                        <NavLink className="nav-link" to="/home">
                                            <span className="fa fa-home fa-lg"></span> Home
                                        </NavLink>
                                    </NavItem> : <div></div>}

                                {!this.props.auth.isAdmin ?
                                    <NavItem>
                                        <NavLink className="nav-link" to="/aboutus">
                                            <span className="fa fa-info fa-lg"></span> About Us
                                        </NavLink>
                                    </NavItem> : <div></div>}
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg"></span> Menu
                                    </NavLink>
                                </NavItem>
                                {this.props.auth.isAdmin ?
                                    <NavItem>
                                        <NavLink className="nav-link" to="/leaders">
                                            <span className="fa fa-list fa-lg"></span> Leaders
                                        </NavLink>
                                    </NavItem> : <div></div>}
                                {this.props.auth.isAdmin ?
                                    <NavItem>
                                        <NavLink className="nav-link" to="/promos">
                                            <span className="fa fa-list fa-lg"></span> Promos
                                        </NavLink>
                                    </NavItem> : <div></div>}
                                {this.props.auth.isAdmin ?
                                    <NavItem>
                                        <NavLink className="nav-link" to="/tables">
                                            <span className="fa fa-list fa-lg"></span> Tables
                                        </NavLink>
                                    </NavItem> : <div></div>}
                                {this.props.auth.isAdmin ?
                                    <NavItem>
                                        <NavLink className="nav-link" to="/users">
                                            <span className="fa fa-list fa-lg"></span> Users
                                        </NavLink>
                                    </NavItem> : <div></div>}
                                {this.props.auth.isAdmin ?
                                    <NavItem>
                                        <NavLink className="nav-link" to="/feedbacks">
                                            <span className="fa fa-list fa-lg"></span> Feedbacks
                                        </NavLink>
                                    </NavItem> : <div></div>}
                                {this.props.auth.isAdmin ?
                                    <NavItem>
                                        <NavLink className="nav-link" to="/fileUpload">
                                            <span className="fa fa-list fa-lg"></span> FileUpload
                                        </NavLink>
                                    </NavItem> : <div></div>}

                                {!this.props.auth.isAdmin ?
                                    <NavItem>
                                        <NavLink className="nav-link" to="/favorites">
                                            <span className="fa fa-heart fa-lg"></span> My Favorites
                                        </NavLink>
                                    </NavItem>
                                    : <div></div>}
                                {!this.props.auth.isAdmin ?
                                    <NavItem>
                                        <NavLink className="nav-link" to="/contactus">
                                            <span className="fa fa-address-card fa-lg"></span> Contact Us
                                        </NavLink>
                                    </NavItem>
                                    : <div></div>}
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    {!this.props.auth.isAuthenticated ?
                                        <div>

                                            <Button className="btn btn-danger mr-3" onClick={this.toggleRegisterModal}>
                                                Register
                                            </Button>

                                            <Button className="btn btn-danger" onClick={this.toggleModal}>
                                                <span className="fa fa-sign-in fa-lg"></span> Login
                                                {this.props.auth.isFetching ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                            </Button>
                                        </div>

                                        :
                                        <div>
                                            <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                            <Button className="btn btn-danger" onClick={this.handleLogout}>
                                                <span className="fa fa-sign-out fa-lg"></span> Logout
                                                {this.props.auth.isFetching ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                            </Button>
                                        </div>
                                    }

                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Happy Restaurant</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                            <div className="col-12 col-sm-3 align-self-center">
                                <img
                                    className="img-fluid"
                                    src="assets/images/logo.png"
                                    alt="Ristorante con Fusion"
                                />
                            </div>
                            <div className="col-12 col-sm-3 align-self-center">
                                <Button className="btn btn-warning btn-sm btn-block" onClick={this.toggleReserveModal}>
                                    Reserve Table
                                </Button>
                            </div>
                        </div>


                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isReserveModalOpen} toggle={this.toggleReserveModal}>
                    <ModalHeader toggle={this.toggleReserveModal}>ReserveTable</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleReserveTable}>
                            <FormGroup>
                                <Label htmlFor="no_of_guest">Number of Guest</Label>
                                <Input type="text" id="no_of_guest" name="no_of_guest"
                                    innerRef={(input) => this.no_of_guest = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="phone_number">Phone number</Label>
                                <Input type="number" id="phone_number" name="phone_number"
                                    innerRef={(input) => this.phone_number = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="date">Date</Label>
                                <Input type="text" id="date" name="date"
                                    innerRef={(input) => this.date = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="time">Time</Label>
                                <Input type="text" id="time" name="time"
                                    innerRef={(input) => this.time = input} />
                            </FormGroup>

                            <Button type="submit" value="submit" color="primary">Reserve</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isRegisterModalOpen} toggle={this.toggleRegisterModal}>
                    <ModalHeader toggle={this.toggleRegisterModal}>Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleRegister}>
                            <FormGroup>
                                <Label htmlFor="firstname">Firstname</Label>
                                <Input type="text" id="firstname" name="firstname"
                                    innerRef={(input) => this.firstname = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastname">Lastname</Label>
                                <Input type="text" id="lastname" name="lastname"
                                    innerRef={(input) => this.lastname = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="rusername">Username</Label>
                                <Input type="text" id="rusername" name="rusername"
                                    innerRef={(input) => this.rusername = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="rpassword">Password</Label>
                                <Input type="password" id="rpassword" name="rpassword"
                                    innerRef={(input) => this.rpassword = input} />
                            </FormGroup>

                            <Button type="submit" value="submit" color="primary">Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;