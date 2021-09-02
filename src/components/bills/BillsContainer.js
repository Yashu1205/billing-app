import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startGetBills } from '../../actions/billsAction'
import AddBill from './AddBill'
import BillsList from './BillsList'

const BillsContainer = (props) => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetBills())
    },[])

    const handleModal = () => setShowModal(!showModal)

    return (
        <div className="container mt-3">
            <BillsList handleModal={handleModal} />
            <AddBill showModal={showModal} handleModal={handleModal} />
        </div>
    )
}

export default BillsContainer