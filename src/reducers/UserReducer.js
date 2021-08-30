import { SET_ERRORS, IS_LOGIN } from '../actions/UserAction'

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

        default : {
            return {...state}
        }
    }
    
}

export default UserReducer