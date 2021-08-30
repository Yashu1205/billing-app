import { createStore, combineReducers } from 'redux'
import UserReducer from '../reducers/UserReducer'

const configureStore = () => {

    const store = createStore(combineReducers({
        user: UserReducer
    }))
    return store
}

export default configureStore