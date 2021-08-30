import { SET_ERRORS, IS_LOGIN, REMOVE_ERRORS } from '../actions/UserAction'

const userInitialValues = {
    isLogin: localStorage.getItem('token') || false,
    serverErrors: {}
}

const UserReducer = (state = userInitialValues, action) => {
    switch(action.type){

        case SET_ERRORS:{
            return {...state, serverErrors: action.payload}
        }

        case IS_LOGIN: {
            return {...state, isLogin: true}
        }

        case REMOVE_ERRORS: {
            return {...state, serverErrors: {}}
        }

        default : {
            return {...state}
        }
    }
    
}

export default UserReducer