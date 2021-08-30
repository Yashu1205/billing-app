import axios from 'axios'
import Swal from 'sweetalert2'
export const REGISTER_USER = 'REGISTER_USER'
export const SET_ERRORS = 'SET_ERRORS'
export const REMOVE_ERRORS = 'REMOVE_ERRORS'
export const IS_LOGIN = 'IS_LOGIN'


const baseApiUrl = 'http://dct-billing-app.herokuapp.com/api'
export const startUserRegistration = (formData, resetForm, redirectToLogin) => {
    console.log(formData)
    return (dispatch) => {
                axios.post(`${baseApiUrl}/users/register`, formData)
                     .then((response) => {
                         const result = response.data
                         console.log(result)
                         if(result.hasOwnProperty('errors')){
                             dispatch(setServerErrors(result.errors))
                         }
                         else if(result.hasOwnProperty('driver')){
                             dispatch(setServerErrors(result.keyValue))
                         }
                         else{
                             resetForm()
                             Swal.fire('Successful', 'Successfully Registered','success')
                             redirectToLogin()
                         }
                     })
                     .catch((error) => {
                         console.log(error)
                     })
    }
}

export const startLoginUser = (formData, resetForm, redirectToHome) => {

    return (dispatch) => {
            axios.post(`${baseApiUrl}/users/login`, formData)
                 .then((response) => {
                     const result = response.data
                     if(result.hasOwnProperty('errors')){
                         dispatch(setServerErrors(result))
                     }
                     else{
                         localStorage.setItem('token', response.data.token)
                         resetForm()
                         dispatch(isLogin())
                         Swal.fire('Success', 'Logged in Successfully','success')
                         redirectToHome()
                     }
                 })
                 .catch((error) => {
                     Swal.fire('Oops..',error.message,'error')
                 })
    }
}  

const setServerErrors = (errors) => {
    console.log(errors)
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

const isLogin = (errors) => {
    return {
        type: IS_LOGIN
    }
}