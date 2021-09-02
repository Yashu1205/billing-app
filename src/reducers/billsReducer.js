import { SET_BILLS, ADD_BILL, BILL_DETAILS, DELETE_BILL } from "../actions/billsAction"

const billsInitialValues = { data: { bills: []}}

const billsReducer = (state = billsInitialValues.data, action) => {

    switch(action.type){
        case SET_BILLS: {
            return {...state, bills: action.payload}
        }
        default : {
            return {...state}
        }
    }
} 

export default billsReducer

