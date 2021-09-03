import { useDispatch } from 'react-redux'
import { startAddCustomer } from "../../actions/customersAction"
import CustomerForm from "./CustomerForm"

const AddCustomer = (props) => {
    const dispatch = useDispatch()

    const formSubmission = (formData) => {        
        dispatch(startAddCustomer(formData))
    }

    return (
        <div>
            <CustomerForm formSubmission={formSubmission} />
        </div>
    )
}

export default AddCustomer