import { useDispatch } from "react-redux"
import { startUpdateCustomer } from "../../actions/customersAction"
import CustomerForm from "./CustomerForm"

const EditCustomer = (props) => {
    const { id, name, mobile, email , showModal, handleShowModal} = props
    const dispatch = useDispatch()

    const formSubmission = (formData) => {
        dispatch(startUpdateCustomer(formData, id, handleShowModal))
    }
    return (
        <CustomerForm name={name} email={email} mobile={mobile} 
                      showModal={showModal}
                      formSubmission={formSubmission} 
                      handleShowModal={handleShowModal}/>
    )

}

export default EditCustomer 