import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//Loads dishes
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    
  return fetch(baseUrl + 'dishes')
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {
        let errorMessage = new Error(error.message);
        throw errorMessage;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

//tells fetchDishes if dishes are being loaded
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

//tells website dishes failed loading
export const dishesFailed = (errorMessage) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errorMessage
});

//adds dishes
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

//Adds Comment to comments sections
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});  

//Posts comment to server
export const postComment = (dishId, rating, author, comment) => (dispatch) =>  {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }

    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                let error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errorMessage = new Error(error.message);
            throw errorMessage;
        })
        .then(response => response.json())
        //dispatchs new comment to redux store
        .then(comment => dispatch(addComment(comment)))
        .catch(error => {
            console.log(`Post comment ${error.message}`);
            alert('Your comment could not be posted\n Error:' + error.message);
        }); 
    
}

//Loads Comments
export const fetchComments = () => (dispatch) => {
    
  return fetch(baseUrl + 'comments')
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {
        let errorMessage = new Error(error.message);
        throw errorMessage;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

//tells website comments failed loading
export const commentsFailed = (errorMessage) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errorMessage
});

//adds comments
export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

//Loads promos
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                let error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errorMessage = new Error(error.message);
            throw errorMessage;
        })
      .then(response => response.json())
      .then(promos => dispatch(addPromos(promos)))
      .catch(error => dispatch(promosFailed(error.message)));
};

//tells fetchPromos if promos are being loaded
export const promosLoading = () => ({
type: ActionTypes.PROMOS_LOADING
});
  
//tells website promos failed loading
export const promosFailed = (errorMessage) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errorMessage
});
  
//adds promos
export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

//load leaders
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                let error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errorMessage = new Error(error.message);
            throw errorMessage;
        })
      .then(response => response.json())
      .then(promos => dispatch(addLeaders(promos)))
      .catch(error => dispatch(leadersFailed(error.message)));
};

//tells fetchLeaders that the leaders are loading
export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

//sends error message if leaders fail to load
export const leadersFailed = (errorMessage) => ({
    type: ActionTypes.LEADERS_LOADING,
    payload: errorMessage
});

//adds leaders
export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

//posts feedback
export const postFeedback = (values) => (dispatch) =>  {


    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if(response.ok) {
                return response;
            } else {
                let error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errorMessage = new Error(error.message);
            throw errorMessage;
        })
        .then(response => response.json())
        //dispatchs new comment to redux store
        .then(response => alert(JSON.stringify(response)))
        .catch(error => {
            console.log(`Post feedback ${error.message}`);
            alert('Your feedback could not be posted\n Error:' + error.message);
        }); 
    
}
