import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import UserReducer from '../reducers/UserReducer'
import CustomersReducer from '../reducers/customersReducer'
import productsReducer from '../reducers/productsReducer'

const configureStore = () => {

    const store = createStore(combineReducers({
        user: UserReducer,
        customer: CustomersReducer,
        product: productsReducer

    }), applyMiddleware(thunk))
    
    return store
}

export default configureStore