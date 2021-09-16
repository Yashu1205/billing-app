import { SET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "../actions/productsAction"
import { LOGOUT } from "../actions/userAction"
const productsInitalValues = { data: { products: [] }}

const productsReducer = (state = productsInitalValues.data, action ) => {
    switch(action.type){
        case SET_PRODUCTS: {
            return {...state, products: action.payload}
        }

        case ADD_PRODUCT : {
            const newProducts = [action.payload, ...state.products]
            return {...state, products: newProducts}
        }

        case DELETE_PRODUCT: {
            const result = state.products.filter(product => product._id !== action.payload)
            return {...state, products: result}
        }

        case UPDATE_PRODUCT: {
            const result = state.products.map(product => {
                if(product._id === action.payload._id){
                    return {...product, name: action.payload.name, price:  action.payload.price}
                } 
                else{
                    return {...product}
                }
            })
            return {...state, products: result}
        }

        case LOGOUT: {
            return {...productsInitalValues}
        }
        
        default: {
            return {...state}
        }
    }
}

export default productsReducer