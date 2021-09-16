import axios from 'axios'
import Swal from 'sweetalert2'
import { startGetCustomers } from './customersAction'
import { startGetProducts } from './productsAction'
import { startGetBills } from './billsAction'

const baseUrl = 'https://dct-billing-app.herokuapp.com/api/users'
export const REGISTER_USER = 'REGISTER_USER'
export const SET_ERRORS = 'SET_ERRORS'
export const REMOVE_ERRORS = 'REMOVE_ERRORS'
export const USER_ACCOUNT = 'USER_ACCOUNT'
export const LOGOUT = 'LOGOUT'

export const startUserRegistration = (formData, redirect) => {
    return (dispatch) => {
            axios.post(`${baseUrl}/register`, formData)
                    .then((response) => {
                        const result = response.data
                        if(result.hasOwnProperty('errors')){
                            dispatch(setServerErrors(result.errors))
                        }
                        else if(result.hasOwnProperty('driver')){
                            dispatch(setServerErrors(result.keyValue))
                        }
                        else{
                            removeServerErrors()
                            Swal.fire('Successful', 'Successfully Registered','success')
                            redirect()
                        }
                    })
                    .catch((error) => {
                        Swal.fire('Oops...', error.message, 'error')
                    })
    }
}

export const startLoginUser = (formData, redirect) => {
    return (dispatch) => {
            axios.post(`${baseUrl}/login`, formData)
                 .then((response) => {
                     const result = response.data
                     if(result.hasOwnProperty('errors')){
                         dispatch(setServerErrors(result))
                     }
                     else{
                         localStorage.setItem('token', response.data.token)
                         Swal.fire('Success', 'Successfully Logged in','success')
                         dispatch(startGetCustomers())
                         dispatch(startGetProducts())
                         dispatch(startGetBills())
                         dispatch(startGetUserProfile())
                         redirect()
                     }
                 })
                 .catch((error) => {
                     Swal.fire('Oops..',error.message,'error')
                 })
    }
}  

export const startGetUserProfile  = () => {
    return (dispatch) => {
            axios.get(`${baseUrl}/account`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then((response) => {
                    const result = response.data
                    dispatch(setUserAccount(result))
                })
                .catch((error) => {
                    Swal.fire('Oops...', error.message, 'error')
                })
    }
}

const setServerErrors = (errors) => {
    return {
        type: SET_ERRORS,
        payload: errors
    }
}

export const removeServerErrors = () => {
    return {
        type: REMOVE_ERRORS
    }
}

const setUserAccount = (userDetail) => {
    return {
        type: USER_ACCOUNT,
        payload: userDetail
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}