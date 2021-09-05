import axios from 'axios'
import Swal from 'sweetalert2'

const baseApiUrl = 'http://dct-billing-app.herokuapp.com/api/users'
export const REGISTER_USER = 'REGISTER_USER'
export const SET_ERRORS = 'SET_ERRORS'
export const REMOVE_ERRORS = 'REMOVE_ERRORS'
export const IS_LOGIN = 'IS_LOGIN'

export const startUserRegistration = (formData, resetForm, redirectToLogin) => {
    return (dispatch) => {
                axios.post(`${baseApiUrl}/register`, formData)
                     .then((response) => {
                         const result = response.data
                         if(result.hasOwnProperty('errors')){
                             dispatch(setServerErrors(result.errors))
                         }
                         else if(result.hasOwnProperty('driver')){
                             dispatch(setServerErrors(result.keyValue))
                         }
                         else{
                             resetForm()
                             removeServerErrors()
                             Swal.fire('Successful', 'Successfully Registered','success')
                             redirectToLogin()
                         }
                     })
                     .catch((error) => {
                         Swal.fire('Oops...', error.message, 'error')
                     })
    }
}

export const startLoginUser = (formData, resetForm, redirectToHome) => {
    return (dispatch) => {
            axios.post(`${baseApiUrl}/login`, formData)
                 .then((response) => {
                     const result = response.data
                     if(result.hasOwnProperty('errors')){
                         dispatch(setServerErrors(result))
                     }
                     else{
                         localStorage.setItem('token', response.data.token)
                         resetForm()
                         dispatch(isLogin())
                         Swal.fire('Success', 'Successfully Logged in','success')
                         redirectToHome()
                     }
                 })
                 .catch((error) => {
                     Swal.fire('Oops..',error.message,'error')
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

const isLogin = () => {
    return {
        type: IS_LOGIN
    }
}