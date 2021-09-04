import { useDispatch } from "react-redux"
import { startAddProduct } from "../../actions/productsAction"

import ProductForm from "./ProductForm"

const AddProduct = (props) => {    
    const dispatch = useDispatch()     
    const {showModal, handleShowModal } = props

    const formSubmission = (formData) => {
        dispatch(startAddProduct(formData, handleShowModal))
    }    

    return (
        <>
            {showModal && 
                <ProductForm title="Add New Product"
                             showModal={showModal} 
                             handleShowModal={handleShowModal} 
                             formSubmission={formSubmission} />
            }
        </>
    )


} 

export default AddProduct