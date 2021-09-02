import axios from 'axios'
import Swal from 'sweetalert2'

export const SET_BILLS = 'SET_BILLS'
export const ADD_BILL = 'ADD_BILL'
export const BILL_DETAILS = 'BILL_DETAILS' 
export const DELETE_BILL = 'DELETE_BILL'

const baseUrl = "http://dct-billing-app.herokuapp.com/api/bills"
const token = localStorage.getItem('token')

export const startGetBills = () => {
    return (dispatch) => {
            axios.get(baseUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    const result = response.data
                    dispatch(setBills(result))
                    console.log(result)
                })
                .catch((error) => {
                    Swal.fire('Oops...', error.message, 'error')
                })

    }
}

const setBills = (bills) => {
    return {
        type: SET_BILLS,
        payload: bills
    }
}

