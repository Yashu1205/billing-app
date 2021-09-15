import axios from "axios"
import Swal from "sweetalert2"

const baseUrl = 'https://dct-billing-app.herokuapp.com/api/products'

export const SET_PRODUCTS = 'SET_PRODUCTS'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const startGetProducts = () => {
    return (dispatch) => {
        axios.get(baseUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                const result = response.data
                dispatch(setProducts(result.reverse()))
            })
            .catch((error) => {
                Swal.fire('Oops...', error.message, 'error')
            })
    }
}

export const startAddProduct = (formData, handleModal) => {
    return (dispatch) => {
        axios.post(baseUrl, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
             })
             .then((response)  => {
                 const result  = response.data
                 dispatch(addProduct(result))
                 handleModal()
                 Swal.fire('Successful', 'Product added successfully', 'success')
             })
             .catch((error) => {
                 Swal.fire('Oops...', error.message, 'error')
             })
    }
}

export const startDeleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(`${baseUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                const result = response.data
                dispatch(deleteProduct(result._id))
                Swal.fire('','Product Deleted Successfully','success')
            })
            .catch((error) => {
                Swal.fire('Oops...', error.message, 'error')
            })
    }
}

export const startUpdateProduct = (updatedData, id, handleModal) => {
    return (dispatch) => {
        axios.put(`${baseUrl}/${id}`, updatedData, {
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                const result = response.data
                dispatch(updateProduct(result))
                handleModal()
                Swal.fire('', 'Product updated successfully', 'success')
            })
    }
}

const setProducts = (products) => {
    return {
        type: SET_PRODUCTS,
        payload: products
    }
}

const addProduct = (newProduct) => {
    return {
        type: ADD_PRODUCT,
        payload: newProduct
    }
}

const deleteProduct = (id) => {
    return {
        type: DELETE_PRODUCT,
        payload: id
    }
} 

const updateProduct = (updatedProduct) => {
    return {
        type: UPDATE_PRODUCT,
        payload: updatedProduct
    }
}
