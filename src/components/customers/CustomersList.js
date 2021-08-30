import { useState } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { startDeleteCustomer } from "../../actions/customersAction"
import CustomerItem from "./CustomerItem"
import AddCustomer from "./AddCustomer"

const CustomersList = (props) => {
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const { customers } = useSelector(state => {
        return state.customer 
    })
    const dispatch = useDispatch()

    const handleFormToggle = () => {
        setShowAddForm(!showAddForm)
    }

    const removeCustomer = (id) => {
        dispatch(startDeleteCustomer(id))
    } 

    const editCustomer = (formData) => {
        console.log('updated data',formData)
    }
    
    return (
        <div>
            <h2>Listing Customers - { customers.length }</h2>
            <button onClick={() => setShowAddForm(true)}>Add new customer</button> 
            {customers.length > 0 &&
                customers.map(customer => {
                    return <CustomerItem key={customer._id} {...customer} removeCustomer={removeCustomer} />
                })
            }
            {
                showAddForm && <AddCustomer handleFormToggle={handleFormToggle} />
            }
            
        </div>
    )
}

export default CustomersList