import { useDispatch } from 'react-redux'
import { startAddCustomer } from '../../actions/customersAction'
import CustomerForm from './CustomerForm'

const AddCustomer = (props) => {
    const dispatch = useDispatch()
    const { showModal, handleShowModal } = props

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