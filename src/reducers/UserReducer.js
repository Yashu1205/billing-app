import { SET_ERRORS, IS_LOGIN, REMOVE_ERRORS, USER_ACCOUNT } from '../actions/UserAction'

const userInitialValues = {
    isLoggedIn: localStorage.getItem('token') ? true : false,
    serverErrors: {},
    userAccount: {}
}

const userReducer = (state = userInitialValues, action) => {
    switch(action.type){

        case SET_ERRORS:{
            return {...state, serverErrors: action.payload}
        }

        case IS_LOGIN: {
            return {...state, isLoggedIn: true}
        }

        case REMOVE_ERRORS: {
            return {...state, serverErrors: {}}
        }

        case USER_ACCOUNT: {
            return {...state, userAccount: action.payload }
        }

        default : {
            return {...state}
        }
    }
    
}

export default userReducer