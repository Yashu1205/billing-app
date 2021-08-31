import axios from "axios"
import Swal from "sweetalert2"

const baseUrl = 'http://dct-billing-app.herokuapp.com/api/customers'
export const SET_CUSTOMERS = 'SET_CUSTOMERS'
export const ADD_CUSTOMER = 'ADD_CUSTOMER'
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER'
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER'

export const startGetCustomers = () => {
    return (dispatch) => {
        axios.get(baseUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                const result = response.data
                dispatch(setCustomers(result))               
            })
            .catch((error) => {
                Swal.fire('Oops...', error.message, 'error')
            })
    }
}

export const startAddCustomer = (formData, handleFormToggle) => {
    return (dispatch) => {
        axios.post(baseUrl, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            .then((response) => {
                const result = response.data
                dispatch(addCustomer(result))
                handleFormToggle()
                Swal.fire('Success', 'Customer added successfully', 'success')
            })
            .catch((error) => {
                Swal.fire('Oops...', error.message, 'error')
            })  
    }
}

export const startDeleteCustomer = (id) => {
    return (dispatch) => {
        axios.delete(`${baseUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                const result = response.data
                dispatch(deleteCustomer(result._id))
                Swal.fire('Successful', 'Customer deleted successfully', 'success')
            })
            .catch((error) => {
                Swal.fire('Oops...', error.message, 'error')
            })
    }
} 

export const startUpdateCustomer = (formData,id, handleEditForm) => {
    return (dispatch) => {
            axios.put(`${baseUrl}/${id}`, formData, { 
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then((response) => {
                    const result = response.data
                    dispatch(updateCustomer(result))
                    handleEditForm()
                    Swal.fire('Successful', 'Customer updated successfully', 'success')
                })
                .catch((error) => {
                    Swal.fire('Oops...', error.message, 'error')
                })
        }   
}

const setCustomers = (customers) => {
    return {
        type: SET_CUSTOMERS,
        payload: customers
    }
}

const addCustomer = (customer) => {
    return {
        type: ADD_CUSTOMER,
        payload: customer
    }
}

const deleteCustomer = (id) => {
    return {
        type: DELETE_CUSTOMER,
        payload: id
    }
}

const updateCustomer = (customer) => {
    return {
        type: UPDATE_CUSTOMER,
        payload: customer
    }
}