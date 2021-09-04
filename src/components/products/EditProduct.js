import { useDispatch } from "react-redux";
import { startUpdateProduct } from "../../actions/productsAction";
import ProductForm from "./ProductForm";

const EditProduct = (props) => {
    const { id, name, price, showModal, handleShowModal } = props
    const dispatch = useDispatch()

    const formSubmission = (formData) => {
        dispatch(startUpdateProduct(formData,id, handleShowModal))
    }

    return (
        <ProductForm name={name} 
                     price={price} 
                     showModal={showModal} 
                     handleShowModal={handleShowModal} 
                     formSubmission={formSubmission} />
    )
}

export default EditProduct