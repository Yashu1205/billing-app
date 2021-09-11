import axios from 'axios'
import Swal from 'sweetalert2'

export const SET_BILLS = 'SET_BILLS'
export const ADD_BILL = 'ADD_BILL'
export const BILL_DETAILS = 'BILL_DETAILS' 
export const DELETE_BILL = 'DELETE_BILL'

const baseUrl = "https://dct-billing-app.herokuapp.com/api/bills"
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
                    dispatch(setBills(result.reverse()))
                })
                .catch((error) => {
                    Swal.fire('Oops...', error.message, 'error')
                })

    }
}

export const startAddBill = (formData, handleModal, redirectToBillDetails) => {
    return (dispatch) => {
        axios.post(baseUrl, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                const result = response.data
                dispatch(addBill(result))
                handleModal()
                Swal.fire('Success', 'Bill added successfully', 'success')
                redirectToBillDetails(result._id)
            })
            .catch((error) => {
                Swal.fire('Oops...', error.message, 'error')
            })
    }
}

export const startDeleteBill  = (id) => {
    return (dispatch) => {
        axios.delete(`${baseUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                const result = response.data
                dispatch(deleteBill(result._id))
                Swal.fire('Success', 'bill deleted successfully','success')
            })
    }
}

export const startBillDetails = (id, handleShowBillModal ) => {
    return (dispatch) => {
        axios.get(`${baseUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                const result = response.data
                dispatch(setBillDetails(result))
                handleShowBillModal()
            })
            .catch((error) => {
                Swal.fire('Oops...',error.message, 'error')
            })
    }
}

const setBills = (bills) => {
    return {
        type: SET_BILLS,
        payload: bills
    }
}

const addBill = (newBill) => {
    return {
        type: ADD_BILL,
        payload: newBill
    }
}

const deleteBill = (id) => {
    return {
        type: DELETE_BILL,
        payload: id 
    }
}

const setBillDetails = (billDetails) => {
    return {
        type: BILL_DETAILS,
        payload: billDetails
    }
}
