import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, comment) => (dispatch) => {

    const newComment = {
        dish: dishId,
        rating: rating,
        comment: comment
    }
    console.log('Comment ', newComment);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
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
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('Post comments ', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        })
}
export const deleteComment = (commentId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'comments/' + commentId, {
        method: 'DELETE',
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
        .then(response => { dispatch(removeComment(response)); alert('comment removed successfully') })
        .catch(error => {
            console.log('delete comment ', error.message);
            alert('comment could not be removed\nError: ' + error.message);
        })
}

export const removeComment = (comment) => (
    {
        type: ActionTypes.DELETE_COMMENT,
        payload: comment._id
    }
)
export const postDish = (newDish) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'dishes', {
        method: 'POST',
        body: JSON.stringify(newDish),
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
        .then(response => { dispatch(addDish(response)); alert('Dish added successfully') })
        .catch(error => {
            console.log('Post Dish ', error.message);
            alert('Your Dish could not be posted\nError: ' + error.message);
        })
}
export const updateDish = (dishId, newDish) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'dishes/' + dishId, {
        method: 'PUT',
        body: JSON.stringify(newDish),
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
        .then(response => { dispatch(changeDish(response)); alert('Dish added successfully') })
        .catch(error => {
            console.log('Update Dish ', error.message);
            alert('Your Dish could not be updated\nError: ' + error.message);
        })
}
export const changeDish = (dish) => ({
    type: ActionTypes.UPDATE_DISH,
    payload: dish
}
)
export const addDish = (dish) => ({
    type: ActionTypes.ADD_DISH,
    payload: dish
});
export const deleteDish = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'dishes/' + dishId, {
        method: 'DELETE',
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
        .then(response => { dispatch(removeDish(response)); alert('Dish removed successfully') })
        .catch(error => {
            console.log('delete Dish ', error.message);
            alert('Your Dish could not be removed\nError: ' + error.message);
        })
}

export const removeDish = (dish) => (
    {
        type: ActionTypes.DELETE_DISH,
        payload: dish._id
    }
)

export const postLeader = (newleader) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'leaders', {
        method: 'POST',
        body: JSON.stringify(newleader),
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
        .then(response => { dispatch(addLeader(response)); alert('leader added successfully') })
        .catch(error => {
            console.log('Post leader ', error.message);
            alert('Your leader could not be posted\nError: ' + error.message);
        })
}
export const addLeader = (leader) => ({
    type: ActionTypes.ADD_LEADER,
    payload: leader
});
export const updateLeader = (leaderId, newLeader) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'leaders/' + leaderId, {
        method: 'PUT',
        body: JSON.stringify(newLeader),
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
        .then(response => { dispatch(changeLeader(response)); alert('leader updated successfully') })
        .catch(error => {
            console.log('Update leader ', error.message);
            alert('Your leader could not be updated\nError: ' + error.message);
        })
}
export const changeLeader = (leader) => ({
    type: ActionTypes.UPDATE_LEADER,
    payload: leader,
}
)
export const deleteLeader = (leaderId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'leaders/' + leaderId, {
        method: 'DELETE',
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
        .then(response => { dispatch(removeLeader(response)); alert('leader removed successfully') })
        .catch(error => {
            console.log('delete leader ', error.message);
            alert('Your leader could not be removed\nError: ' + error.message);
        })
}

export const removeLeader = (leader) => (
    {
        type: ActionTypes.DELETE_LEADER,
        payload: leader._id
    }
)
export const postPromo = (newpromo) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'promotions', {
        method: 'POST',
        body: JSON.stringify(newpromo),
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
        .then(response => { dispatch(addPromo(response)); alert('promo added successfully') })
        .catch(error => {
            console.log('Post promo ', error.message);
            alert('Your promo could not be posted\nError: ' + error.message);
        })
}
export const addPromo = (promo) => ({
    type: ActionTypes.ADD_PROMO,
    payload: promo
});
export const updatePromo = (promoId, newpromo) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'promotions/' + promoId, {
        method: 'PUT',
        body: JSON.stringify(newpromo),
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
        .then(response => { dispatch(changePromo(response)); alert('promo updated successfully') })
        .catch(error => {
            console.log('Update promo ', error.message);
            alert('Your promo could not be updated\nError: ' + error.message);
        })
}
export const changePromo = (promo) => ({
    type: ActionTypes.UPDATE_PROMO,
    payload: promo,
}
)

export const deletePromo = (promoId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'promotions/' + promoId, {
        method: 'DELETE',
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
        .then(response => { dispatch(removePromo(response)); alert('promo removed successfully') })
        .catch(error => {
            console.log('delete promo ', error.message);
            alert('Your promo could not be removed\nError: ' + error.message);
        })
}

export const removePromo = (promo) => (
    {
        type: ActionTypes.DELETE_PROMO,
        payload: promo._id
    }
)



export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
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
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
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
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
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
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
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
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFeedback = (feedback) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
            'Authorization': bearer,
            "Content-Type": "application/json"
        },
        credentials: "same-origin"

    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!\n' + JSON.stringify(response)); })
        .catch(error => { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: ' + error.message); });
};

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                // Dispatch the success action
                dispatch(fetchFavorites());
                dispatch(receiveLogin(response));
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}

export const postFavorite = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: "POST",
        body: JSON.stringify({ "_id": dishId }),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(favorites => { console.log('Favorite Added', favorites); dispatch(addFavorites(favorites)); })
        .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(favorites => { console.log('Favorite Deleted', favorites); dispatch(addFavorites(favorites)); })
        .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites', {
        method: 'GET',
        headers: {
            'Authorization': bearer
        },
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
        .then(favorites => dispatch(addFavorites(favorites)))
        .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});

export const postTable = (newTable) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'tables', {
        method: 'POST',
        body: JSON.stringify(newTable),
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
        .then(response => { dispatch(addTable(response)); alert('table added successfully') })
        .catch(error => {
            console.log('Post table ', error.message);
            alert('Your table could not be posted\nError: ' + error.message);
        })
}
export const addTable = (table) => ({
    type: ActionTypes.ADD_TABLE,
    payload: table
});
export const deleteTable = (tableId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'tables/' + tableId, {
        method: 'DELETE',
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
        .then(response => { dispatch(removeTable(response)); alert('table removed successfully') })
        .catch(error => {
            console.log('delete table ', error.message);
            alert('Your table could not be removed\nError: ' + error.message);
        })
}

export const removeTable = (table) => (
    {
        type: ActionTypes.DELETE_TABLE,
        payload: table.Id
    }
)

export const fetchTables = () => (dispatch) => {
    dispatch(tablesLoading(true));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'tables',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
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
        .then(tables => dispatch(addTables(tables)))
        .catch(error => dispatch(tablesFailed(error.message)));
}

export const tablesLoading = () => ({
    type: ActionTypes.TABLES_LOADING
});

export const tablesFailed = (errmess) => ({
    type: ActionTypes.TABLES_FAILED,
    payload: errmess
});

export const addTables = (tables) => ({
    type: ActionTypes.ADD_TABLES,
    payload: tables
});