import { useState } from "react"
import { useDispatch } from "react-redux"
import EditCustomer from "./EditCustomer"
import Swal from 'sweetalert2'

const CustomerItem = (props) => {
    const [showEditForm, setShowEditForm] = useState(false)
    const { _id, name, email, mobile, user, removeCustomer } = props

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

    const handleFormToggle = () => {
        setShowEditForm(!showEditForm)
    }
    
    return (
        <div className="card mb-3 p-1">
            <p>{name} - {mobile} - {email} 
                <button className="btn btn-sm btn-danger" onClick={handleRemoveCustomer}>Delete</button>
                <button className="btn btn-sm btn-info" onClick={() => setShowEditForm(true)}>Edit</button>
            </p>
            {
                showEditForm && <EditCustomer id={_id} name={name} mobile={mobile} email={email} 
                                              handleFormToggle={handleFormToggle}/>
            }
        </div>
    )
}

export default CustomerItem