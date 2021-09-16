import { SET_BILLS, ADD_BILL, BILL_DETAILS, DELETE_BILL } from "../actions/billsAction"
import { LOGOUT } from "../actions/userAction"

const billsInitialValues = { data: { bills: [], billDetails: {}}}

const billsReducer = (state = billsInitialValues.data, action) => {

    switch(action.type){
        case SET_BILLS: {
            return {...state, bills: action.payload}
        }

        case ADD_BILL: {
            const newBills = [action.payload, ...state.bills]
            return {...state, bills: newBills, billDetails: action.payload}
        }

        case DELETE_BILL: {
            const result = state.bills.filter(bill => bill._id !== action.payload)
            return {...state, bills: result}
        }

        case BILL_DETAILS: {
            return {...state, billDetails: action.payload}
        }

        case LOGOUT: {
            return {...billsInitialValues}
        }
        
        default : {
            return {...state}
        }
    }
} 

export default billsReducer

