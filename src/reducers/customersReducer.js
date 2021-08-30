import { SET_CUSTOMERS, ADD_CUSTOMER, DELETE_CUSTOMER, UPDATE_CUSTOMER } from "../actions/customersAction"

const customersInitialValues = { data: { customers: []}}

const customersReducer = (state = customersInitialValues.data, action) => {
    switch(action.type){
        case SET_CUSTOMERS: {
            return {...state, customers: action.payload }
        }

        case ADD_CUSTOMER: {
            const newCustomers = [action.payload, ...state.customers]
            return {...state, customers: newCustomers}
        }

        case DELETE_CUSTOMER: {
            const result = state.customers.filter(customer => customer._id !== action.payload)
            return { ...state, customers: result}
        }

        case UPDATE_CUSTOMER: {
            const result = state.customers.map(customer => {
                if(customer._id === action.payload._id){
                    return {...customer, name: action.payload.name, email: action.payload.email, mobile: action.payload.mobile}
                }
                else{
                    return {...customer}
                }
            })
            return {...state, customers: result}
        }

        default: {
            return {...state}
        }
    }

}

export default customersReducer