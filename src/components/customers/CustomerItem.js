import { useState } from "react"
import { useSelector } from 'react-redux' 
import EditCustomer from "./EditCustomer"
import Swal from 'sweetalert2'
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs'

const CustomerItem = (props) => {
    const [showModal, setShowModal] = useState(false)
    const { _id, name, email, mobile, removeCustomer } = props

    const { bills } = useSelector((state) => {
        return state.bill
    })

    const handleShowModal = () => setShowModal(!showModal)

    const customerBills = bills.filter(bill => bill.customer === _id)

    const handleRemoveCustomer = () => {
            Swal.fire({
                title: `${customerBills.length} bills were created for this customer. Are you sure to delete?`,
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
                    removeCustomer(_id)
                }
           })
    }
    
    return (
        <div className="card mb-3">
            <div className="row">
                <div className="col-md-8 detail">
                    <pre style={{margin:'20px'}}>{name}  {mobile} { email && `- ${email}`}</pre>
                </div>
                <div className="col-md-4 action">
                    <button className="btn btn-sm btn-danger" onClick={handleRemoveCustomer}><BsFillTrashFill size="1.5em" /></button>
                    <button className="btn btn-sm btn-info" onClick={handleShowModal}><BsPencilSquare size="1.5em"/></button>
                </div>
            </div>
            {
                showModal && <EditCustomer id={_id} name={name} mobile={mobile} email={email} 
                                            showModal={showModal}
                                            handleShowModal={handleShowModal}/>
            }
        </div>
    )
}

export default CustomerItem