import { useState } from "react"
import { useDispatch } from "react-redux"
import EditCustomer from "./EditCustomer"

const CustomerItem = (props) => {
    const [showEditForm, setShowEditForm] = useState(false)
    const { _id, name, email, mobile, user, removeCustomer } = props

    const handleRemoveCustomer = () => {
        const conf = window.confirm('Are you sure to delete the customer?')
        if(conf){
            removeCustomer(_id)
        }
    }

    const handleEditForm = () => {
        setShowEditForm(!showEditForm)
    }
    
    return (
        <div className="card mb-3">
            <p>{name} - {mobile} - {email} 
                <button className="btn btn-sm btn-danger" onClick={handleRemoveCustomer}>Delete</button>
                <button className="btn btn-sm btn-info" onClick={() => setShowEditForm(true)}>Edit</button>
            </p>
            {
                showEditForm && <EditCustomer id={_id} name={name} mobile={mobile} email={email} 
                                              handleEditForm={handleEditForm}/>
            }
        </div>
    )
}

export default CustomerItem