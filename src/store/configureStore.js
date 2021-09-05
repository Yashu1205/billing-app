import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import UserReducer from '../reducers/userReducer'
import customersReducer from '../reducers/customersReducer'
import productsReducer from '../reducers/productsReducer'
import billsReducer from '../reducers/billsReducer'

const configureStore = () => {

    const store = createStore(combineReducers({
        user: UserReducer,
        customer: customersReducer,
        product: productsReducer,
        bill: billsReducer

    }), applyMiddleware(thunk))
    
    return store
}

export default configureStore