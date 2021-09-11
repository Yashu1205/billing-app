import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { startAddBill } from '../../actions/billsAction'
import BillForm from './BillForm'

const AddBill = (props) => {
    const {showModal, handleShowModal} =props
    const dispatch = useDispatch()
    const customers = useSelector(state => {
        return state.customer
    })
    let history = useHistory()

    const products = useSelector(state => {
        return state.product
    })
    const redirectToBillDetails = (billId) => {
        console.log(billId)
        history.push(`/bill-detail/${billId}`)
    }
    const formSubmission = (formData) => {
        dispatch(startAddBill(formData, handleShowModal,redirectToBillDetails))
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