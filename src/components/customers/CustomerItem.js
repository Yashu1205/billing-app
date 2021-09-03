import { useState } from "react"
import { useDispatch } from "react-redux"
import EditCustomer from "./EditCustomer"
import Swal from 'sweetalert2'

const CustomerItem = (props) => {
    const [showModal, setShowModal] = useState(false)
    const { _id, name, email, mobile, removeCustomer } = props

    const handleShowModal = () => setShowModal(!showModal)

    const handleRemoveCustomer = () => {
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
                    removeCustomer(_id)
                }
           })
    }
    
    return (
        <div className="card mb-3 p-1">
            <div className="row">
                <div className="col-md-8 detail">
                    <p>{name} - {mobile} { email && `- ${email}`}</p>
                </div>
                <div className="col-md-4 action">
                    <button className="btn btn-sm btn-danger" onClick={handleRemoveCustomer}>Delete</button>
                    <button className="btn btn-sm btn-info" onClick={handleShowModal}>Edit</button>
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