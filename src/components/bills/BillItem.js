import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { startBillDetails } from "../../actions/billsAction"
import Swal from 'sweetalert2'
import ViewBill from "./ViewBill"

const BillItem = (props) => {
    const [showBillModal, setShowBillModal] = useState(false)
    const { _id, customer, date, lineItems, total, removeBill } = props

    const dispatch = useDispatch()
    const { customers } = useSelector((state) => {
        return state.customer
    })
    const { products } = useSelector((state) => {
        return state.product
    })
    const { billDetails } = useSelector((state) => {
        return state.bill
    })

    useEffect(() => {
        
    },[])

    const getCustomerName = (customerId) => {
        return customers.find(cust => cust._id === customerId).name
    }

    const getProductName = (productId) => {
        return products.find(prod => prod._id === productId).name
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
            <p>{getCustomerName(customer)} - {date} - {total} 
                <button className="btn btn-sm btn-danger" onClick={handleRemoveBill}>Delete</button>
                <button className="btn btn-sm btn-info" onClick={getBillDetails}>View</button>
            </p>
            {
                showBillModal && 
                    <ViewBill billDetails={billDetails} showBillModal={showBillModal} 
                              handleShowBillModal={handleShowBillModal} 
                              getCustomerName={getCustomerName}
                              getProductName={getProductName} /> 
            }
        </div>
    )
}

export default BillItem