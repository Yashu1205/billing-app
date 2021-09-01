import { useEffect, useState } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { startDeleteCustomer } from "../../actions/customersAction"
import CustomerItem from "./CustomerItem"
import AddCustomer from "./AddCustomer"

const CustomersList = (props) => {
    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)

    const { customers } = useSelector(state => {
        return state.customer 
    })
    const dispatch = useDispatch()

    useEffect(() => {
        setSearchResults([...customers])
    },[customers])

    const handleFormToggle = () => {
        setShowAddForm(!showAddForm)
    }

    const removeCustomer = (id) => {
        dispatch(startDeleteCustomer(id))
    } 

    const handleSearchChange = (e) => {
        const searchInput = e.target.value
        setQuery(searchInput)
        getSearchResult(searchInput)
    }
    
    const getSearchResult = (query) => {
        const result = customers.filter(customer => {
            return customer.name.toLowerCase().includes(query.toLowerCase()) || 
                    customer.email.toLowerCase().includes(query.toLowerCase()) ||
                    customer.mobile.includes(query)
        })
        setSearchResults(result)
    }
    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <h3>Listing Customers - { customers.length }</h3>
                </div>
                <div className="col-md-4">
                    <input type="text" value={query} onChange={handleSearchChange} placeholder="search customer" className="form-control" /> 
                </div>
                <div className="col-md-4">
                    <button onClick={() => setShowAddForm(true)} style={{float: 'right'}}>Add new customer</button> 
                </div> 
            </div>
            <div className="row">
                <div className="col-md-8">
                    {searchResults.length > 0 &&
                        searchResults.map(customer => {
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