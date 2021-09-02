import BillForm from './BillForm'

const AddBill = (props) => {
    const { showModal, handleModal } = props

    return (
        <>
        {
            showModal && 
            <BillForm  />

        }
        </>
    )
}

export default AddBill