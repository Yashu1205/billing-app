import { useSelector } from 'react-redux'
import BillForm from './BillForm'

const AddBill = (props) => {
    const { showModal, handleModal } = props

    const customers = useSelector(state => {
        return state.customer
    })

    const products = useSelector(state => {
        return state.product
    })

    console.log('products in add',products.products)

    return (
        <>
        {
            showModal && 
            <BillForm  showModal={showModal} handleModal={handleModal} customers={customers.customers} products={products.products} />

        }
        </>
    )
}

export default AddBill