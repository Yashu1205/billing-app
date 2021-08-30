import { createStore, combineReducers, applyMiddleware } from 'redux'
import UserReducer from '../reducers/UserReducer'
import thunk from 'redux-thunk'

const configureStore = () => {

    const store = createStore(combineReducers({
        user: UserReducer

    }), applyMiddleware(thunk))
    
    return store
}

export default configureStore