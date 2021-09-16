import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BsFillEyeFill, BsFillTrashFill } from 'react-icons/bs'
import { startBillDetails } from '../../actions/billsAction'
import Swal from 'sweetalert2'
import ViewBill from './ViewBill'
import moment from 'moment'

const BillItem = (props) => {
    const [showBillModal, setShowBillModal] = useState(false)
    const { _id, date, customerInfo, removeBill } = props

    const dispatch = useDispatch()
    
    const { billDetails } = useSelector((state) => state.bills )
        
    //toggle modal open/close
    const handleShowBillModal = () => setShowBillModal(!showBillModal) 

    //ask for delete confirmation and call removeBill()
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
                    <pre style={{margin:'20px'}}>{customerInfo.name}  {moment(date).format('ll')} </pre>
                </div>
                <div className="col-md-4 action">
                    <button className="btn btn-sm btn-danger" onClick={handleRemoveBill}>
                        <BsFillTrashFill size="1.5em" />
                    </button>
                    <button className="btn btn-sm btn-info" onClick={getBillDetails}>
                        <BsFillEyeFill size="1.5em"/>
                    </button>
                </div>
            </div>
            {
                showBillModal && <ViewBill billDetails={billDetails} 
                                           showBillModal={showBillModal}
                                           handleShowBillModal={handleShowBillModal}
                                           customerInfo={customerInfo}/> 
            }
        </div>    
        
        )
}

export default BillItem