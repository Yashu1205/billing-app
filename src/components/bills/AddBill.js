import { useSelector, useDispatch } from 'react-redux'
import { startAddBill } from '../../actions/billsAction'
import BillForm from './BillForm'

const AddBill = (props) => {
    const { showModal, handleModal } = props
    const dispatch = useDispatch()
    const customers = useSelector(state => {
        return state.customer
    })

    const products = useSelector(state => {
        return state.product
    })

    const formSubmission = (formData) => {
        dispatch(startAddBill(formData, handleModal))
    }

    return (
        <>
        {
            showModal && 
            <BillForm  showModal={showModal} 
                       handleModal={handleModal} 
                       customers={customers.customers} 
                       products={products.products} 
                       formSubmission={formSubmission} />

        }
        </>
    )
}

export default AddBill