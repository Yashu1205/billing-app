import { createStore, combineReducers } from 'redux'

const configureStore = () => {

    const store = createStore(combineReducers({

    }))
    return store
}

export default configureStore