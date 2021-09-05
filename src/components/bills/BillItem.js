import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { startBillDetails } from "../../actions/billsAction"
import Swal from 'sweetalert2'
import { DateTime } from "luxon"
import ViewBill from "./ViewBill"

const BillItem = (props) => {
    const [showBillModal, setShowBillModal] = useState(false)
    const { _id, date, total, customerName, removeBill } = props

    const dispatch = useDispatch()
    
    const { billDetails } = useSelector((state) => {
        return state.bill
    })

    const { products } = useSelector((state) => {
        return state.product
    })
    
    const getProductName = (productId) => {
        const productName = products.find(prod => prod._id === productId)
        return productName ? productName.name : '' 
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
        <div className="card mb-3">
            <div className="row">
                <div className="col-md-8 detail">
                    <p>{customerName} - {DateTime.fromISO(date).toISODate()} {total}</p>
                </div>
                <div className="col-md-4 action">
                    <button className="btn btn-sm btn-danger" onClick={handleRemoveBill}>Delete</button>
                    <button className="btn btn-sm btn-info" onClick={getBillDetails}>View</button>
                </div>
            </div>
            {
                showBillModal && <ViewBill billDetails={billDetails} showBillModal={showBillModal}
                customerName={customerName} 
                handleShowBillModal={handleShowBillModal} 
                getProductName={getProductName} /> 
            }
        </div>
        // <div className="card mb-3 p-1">
        //     <p>{customerName} - {DateTime.fromISO(date).toISODate()} - {total} 
        //         <button className="btn btn-sm btn-danger" onClick={handleRemoveBill}>
        //             Delete</button>
        //         <button className="btn btn-sm btn-info" onClick={getBillDetails}>View</button>
        //     </p>
        //     {
        //         showBillModal && 
                    // <ViewBill billDetails={billDetails} showBillModal={showBillModal}
                    //           customerName={customerName} 
                    //           handleShowBillModal={handleShowBillModal} 
                    //           getProductName={getProductName} /> 
        //     }
        // </div>
    )
}

export default BillItem