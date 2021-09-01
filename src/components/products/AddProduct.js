import { useDispatch } from "react-redux"
import { startAddProduct } from "../../actions/productsAction"

import ProductForm from "./ProductForm"

const AddProduct = (props) => {    
    const dispatch = useDispatch()     
    const {showModal, handleModal } = props

    const formSubmission = (formData) => {
        dispatch(startAddProduct(formData, handleModal))
    }
    

    return (
        <>
            {showModal && 
                <ProductForm showModal={showModal} handleModal={handleModal} formSubmission={formSubmission} />
            }
        </>
    )


} 

export default AddProduct