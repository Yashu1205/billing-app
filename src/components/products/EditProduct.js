import { useDispatch } from "react-redux";
import { startUpdateProduct } from "../../actions/productsAction";
import ProductForm from "./ProductForm";

const EditProduct = (props) => {
    const { id, name, price, showModal, handleModal } = props
    const dispatch = useDispatch()

    const formSubmission = (formData) => {
        dispatch(startUpdateProduct(formData,id, handleModal))
    }

    return (
        <ProductForm name={name} 
                     price={price} 
                     showModal={showModal} 
                     handleModal={handleModal} 
                     formSubmission={formSubmission} />
    )
}

export default EditProduct