import { useEffect, useState } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { startDeleteCustomer } from "../../actions/customersAction"
import CustomerItem from "./CustomerItem"
import AddCustomer from "./AddCustomer"

const CustomersList = (props) => {
    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [orderBy, setOrderBy] = useState('')

    const { customers } = useSelector(state => {
        return state.customer 
    })
    const dispatch = useDispatch()

    useEffect(() => {
        setSearchResults([...customers])
    },[customers])

    const handleModalToggle = () => {
        setShowModal(!showModal)
    }

    const removeCustomer = (id) => {
        dispatch(startDeleteCustomer(id))
    } 

    const getSearchResult = (query) => {
        const result = customers.filter(customer => {
            return customer.name.toLowerCase().includes(query.toLowerCase()) || 
                    customer.email.toLowerCase().includes(query.toLowerCase()) ||
                    customer.mobile.includes(query)
        })
        setSearchResults(result)
    }

    const handleSearchChange = (e) => {
        const searchInput = e.target.value
        setQuery(searchInput)
        getSearchResult(searchInput)
    }    
    
    const getSortedResult = () => {
        const result = searchResults.sort((a,b) => {
            const aName =  a.name.toLowerCase(),   bName = b.name.toLowerCase()

            if(aName < bName){
                return -1
            }
            if(aName > bName){
                return 1
            }
            return 0
        })
        return result
    }

    const handleSort = (e, sortType) => {
        setOrderBy(e.target.value)
        let sortedCustomers = []
        if(e.target.value === 'ascending'){
            sortedCustomers = getSortedResult()
        } else if(e.target.value === 'descending'){
            sortedCustomers = getSortedResult().reverse()
        } else {
            sortedCustomers = [...customers]
        }
        setSearchResults(sortedCustomers)     
    }

    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <h3>Listing Customers - { customers.length }</h3>
                </div>
                <div className="col-md-3">
                    <input type="text" value={query} onChange={handleSearchChange} placeholder="search customer" className="form-control" /> 
                </div>
                <div className="col-md-3">
                    <select name="sort" className="form-control" value={orderBy} onChange={handleSort} placeholder="Sort customers">
                        <option value="">Sort customers</option>
                        <option value="ascending">Sort by name - ascending</option>
                        <option value="descending">Sort by name - descending</option>
                    </select>
                </div> 
                <div className="col-md-3">
                    <button className="btn btn-primary" onClick={handleModalToggle}>Add New Customer</button>
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
                    <AddCustomer handleModalToggle={handleModalToggle} />
                </div>

            </div>
        </>
    )
}

export default CustomersList