import { useDispatch } from "react-redux"
import { startUpdateCustomer } from "../../actions/customersAction"
import CustomerForm from "./CustomerForm"

const EditCustomer = (props) => {
    const { id, name, mobile, email , handleEditForm} = props
    const dispatch = useDispatch()

    const formSubmission = (formData) => {
        dispatch(startUpdateCustomer(formData, id, handleEditForm))
    }
    return (
        <CustomerForm name={name} email={email} mobile={mobile} formSubmission={formSubmission} />
    )

}

export default EditCustomer 