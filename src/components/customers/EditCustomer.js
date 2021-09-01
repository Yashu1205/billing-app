import { useDispatch } from "react-redux"
import { startUpdateCustomer } from "../../actions/customersAction"
import CustomerForm from "./CustomerForm"

const EditCustomer = (props) => {
    const { id, name, mobile, email , handleFormToggle} = props
    const dispatch = useDispatch()

    const formSubmission = (formData) => {
        dispatch(startUpdateCustomer(formData, id, handleFormToggle))
    }
    return (
        <CustomerForm name={name} email={email} mobile={mobile} 
                      formSubmission={formSubmission} 
                      handleFormToggle={handleFormToggle}/>
    )

}

export default EditCustomer 