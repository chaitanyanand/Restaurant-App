import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Favorites from './FavoriteComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Leaders from './LeadersComponent';
import LeaderDetail from './LeaderDetailComponent';
import Promos from './PromoComponent';
import PromoDetail from './PromoDetailComponent';
import Users from './UsersComponent';
import Feedbacks from './feedbacksComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders, fetchTables, loginUser,
  logoutUser, fetchFavorites, postFavorite, deleteFavorite, postDish, postLeader, deleteDish, deleteLeader,
  postPromo, deletePromo, postTable, deleteTable, deleteComment, updateDish, updateLeader, updatePromo
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Tables from './tablesComponent';
import FileUpload from './fileUploadComponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promos: state.promos,
    leaders: state.leaders,
    favorites: state.favorites,
    auth: state.auth,
    tables: state.tables,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTables: () => { dispatch(fetchTables()) },
  postTable: (newTable) => dispatch(postTable(newTable)),
  deleteTable: (tableId) => dispatch(deleteTable(tableId)),
  postDish: (newDish) => dispatch(postDish(newDish)),
  deleteDish: (dishId) => dispatch(deleteDish(dishId)),
  updateDish: (dishId, newDish) => { dispatch(updateDish(dishId, newDish)) },
  postLeader: (newLeader) => dispatch(postLeader(newLeader)),
  deleteLeader: (leaderId) => dispatch(deleteLeader(leaderId)),
  updateLeader: (leaderId, newLeader) => dispatch(updateLeader(leaderId, newLeader)),
  postPromo: (newPromo) => dispatch(postPromo(newPromo)),
  deletePromo: (PromoId) => dispatch(deletePromo(PromoId)),
  updatePromo: (promoId, newpromo) => dispatch(updatePromo(promoId, newpromo)),
  postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
  deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))

});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
    this.props.fetchTables();
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promos.promos.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promos.isLoading}
          promosErrMess={this.props.promos.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    }

    const DishWithId = ({ match }) => {
      return (
        this.props.auth.isAuthenticated
          ?
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
            deleteDish={this.props.deleteDish}
            isAdmin={this.props.auth.isAdmin}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            deleteComment={this.props.deleteComment}
            favorite={this.props.favorites.favorites && this.props.favorites.favorites.dishes &&
              this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId)}
            postFavorite={this.props.postFavorite}
            updateDish={this.props.updateDish}

          />
          :
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
            isLoading={this.props.dishes.isLoading}
            isAdmin={this.props.auth.isAdmin}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            favorite={false}
            postFavorite={this.props.postFavorite}
            deleteComment={this.props.deleteComment}
          />
      );
    }
    const LeaderWithId = ({ match }) => {
      return (
        <LeaderDetail leader={this.props.leaders.leaders.filter((leader) => leader._id === match.params.leaderId)[0]}
          deleteLeader={this.props.deleteLeader}
          updateLeader={this.props.updateLeader}
          isLoading={this.props.leaders.isLoading}
          errMess={this.props.leaders.errMess}

        />
      );
    }
    const PromoWithId = ({ match }) => {
      return (
        <PromoDetail promo={this.props.promos.promos.filter((promo) => promo._id === match.params.promoId)[0]}
          deletePromo={this.props.deletePromo}
          updatePromo={this.props.updatePromo}
          isLoading={this.props.promos.isLoading}
          errMess={this.props.promos.errMess}
        />
      );
    }

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
            pathname: '/home',
            state: { from: props.location }
          }} />
      )} />
    );
    if (this.props.auth.isAdmin) {
      return (<div>
        <Header auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
          postTable={this.props.postTable}
        />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route exact path="/menu" component={() => <Menu isAdmin={this.props.auth.isAdmin} dishes={this.props.dishes} postDish={this.props.postDish} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route path="/leader/:leaderId" component={LeaderWithId} />
              <Route exact path="/leaders" component={() => <Leaders leaders={this.props.leaders} postLeader={this.props.postLeader} />} />
              <Route exact path="/promos" component={() => <Promos promos={this.props.promos} postPromo={this.props.postPromo} />} />
              <Route path="/promos/:promoId" component={PromoWithId} />
              <Route exact path="/tables" component={() => <Tables tables={this.props.tables} deleteTable={this.props.deleteTable} />} />
              <Route exact path="/users" component={() => <Users />} />
              <Route exact path="/feedbacks" component={() => <Feedbacks />} />
              <Route exact path="/fileUpload" component={() => <FileUpload />} />
              <Redirect to="/menu" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>);

    }
    else
      return (
        <div>
          <Header auth={this.props.auth}
            loginUser={this.props.loginUser}
            logoutUser={this.props.logoutUser}
            postTable={this.props.postTable}
          />
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                <Route exact path="/menu" component={() => <Menu isAdmin={this.props.auth.isAdmin} dishes={this.props.dishes} />} />
                <Route path="/menu/:dishId" component={DishWithId} />
                <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
        </div>
      );

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
