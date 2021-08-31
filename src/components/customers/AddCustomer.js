import { useDispatch } from 'react-redux'
import { startAddCustomer } from "../../actions/customersAction"
import CustomerForm from "./CustomerForm"

const AddCustomer = (props) => {
    const dispatch = useDispatch()
    const { handleFormToggle } = props

    const formSubmission = (formData) => {        
        dispatch(startAddCustomer(formData, handleFormToggle))
    }

    return (
        <div>
            <CustomerForm formSubmission={formSubmission} handleFormToggle={handleFormToggle} />
        </div>
    )
}

export default AddCustomer