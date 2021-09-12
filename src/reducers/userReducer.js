import { SET_ERRORS, REMOVE_ERRORS, USER_ACCOUNT } from '../actions/userAction'

const userInitialValues = {
    serverErrors: {},
    userAccount: {}
}

const userReducer = (state = userInitialValues, action) => {
    switch(action.type){

        case SET_ERRORS:{
            return {...state, serverErrors: action.payload}
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