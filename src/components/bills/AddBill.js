import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { startAddBill } from '../../actions/billsAction'
import BillForm from './BillForm'

const AddBill = (props) => {
    const dispatch = useDispatch()
    let history = useHistory()
    
    const {showModal, handleShowModal} =props

    const customers = useSelector(state => state.customers )
    const products = useSelector(state => state.products )
    
    //get form data from bills form and dispatch action to generate bill
    const formSubmission = (formData) => {
        dispatch(startAddBill(formData, history))
    }

    return (
        <>
        {
            showModal && 
            <BillForm  showModal={showModal} 
                       handleShowModal={handleShowModal} 
                       customers={customers.customers} 
                       products={products.products} 
                       formSubmission={formSubmission} />

        }
        </>
    )
}

export default AddBill