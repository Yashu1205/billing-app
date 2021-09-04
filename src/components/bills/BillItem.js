import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { startBillDetails } from "../../actions/billsAction"
import Swal from 'sweetalert2'
import { DateTime } from "luxon"
import ViewBill from "./ViewBill"

const BillItem = (props) => {
    const [showBillModal, setShowBillModal] = useState(false)
    const { _id, date, total, customer, removeBill } = props

    const dispatch = useDispatch()
    
    const { billDetails } = useSelector((state) => {
        return state.bill
    })

    const { products } = useSelector((state) => {
        return state.product
    })

    const { customers } = useSelector((state) => {
        return state.customer
    })

    const getProductName = (productId) => {
        return products.find(prod => prod._id === productId).name
    }

    const getCustomerName = (customerId) => {
        return customers.find(cust => cust._id === customerId).name
    }
    
    const handleShowBillModal = () => setShowBillModal(!showBillModal) 

    const handleRemoveBill = () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            })
           .then((result) => {
                if (result.isConfirmed) {
                    removeBill(_id)
                }
           })
    }

    const getBillDetails = () => {
        dispatch(startBillDetails(_id, handleShowBillModal))
    }
    
    return (
        <div className="card mb-3 p-1">
            <p>{getCustomerName(customer)} - {DateTime.fromISO(date).toISODate()} - {total} 
                <button className="btn btn-sm btn-danger" onClick={handleRemoveBill}>
                    Delete</button>
                <button className="btn btn-sm btn-info" onClick={getBillDetails}>View</button>
            </p>
            {
                showBillModal && 
                    <ViewBill billDetails={billDetails} showBillModal={showBillModal} 
                              handleShowBillModal={handleShowBillModal} 
                              customerName={getCustomerName(customer)}
                              getProductName={getProductName} /> 
            }
        </div>
    )
}

export default BillItem