import { useDispatch } from 'react-redux'
import { startAddCustomer } from '../../actions/customersAction'
import CustomerForm from './CustomerForm'

const AddCustomer = (props) => {
    const dispatch = useDispatch()
    const { showModal, handleShowModal } = props

    //get form data from customer form and dispatch action to add customer
    const formSubmission = (formData) => {      
        dispatch(startAddCustomer(formData, handleShowModal))
    }

    return (
        <div>
            <CustomerForm showModal={showModal} 
                          title="Add New Customer"
                          formSubmission={formSubmission} 
                          handleShowModal={handleShowModal} />
        </div>
    )
}

export default AddCustomer