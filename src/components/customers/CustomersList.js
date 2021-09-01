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
    
    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <h3>Listing Customers - { customers.length }</h3>
                </div>
                <div className="col-md-4">
                    <button onClick={() => setShowAddForm(true)} style={{float: 'right'}}>Add new customer</button> 
                </div> 
            </div>
            <div className="row">
                <div className="col-md-8">
                    {customers.length > 0 &&
                        customers.map(customer => {
                            return <CustomerItem key={customer._id} {...customer} removeCustomer={removeCustomer} />
                        })
                    }
                </div>
                <div className="col-md-4">
                    {
                        showAddForm && <AddCustomer handleFormToggle={handleFormToggle} />
                    }
                </div>

            </div>
        </>
    )
}

export default CustomersList