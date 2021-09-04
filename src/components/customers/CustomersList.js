import { useEffect, useState } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { startDeleteCustomer } from "../../actions/customersAction"
import CustomerItem from "./CustomerItem"
import AddCustomer from "./AddCustomer"
import '../../css/header.css'

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

    const handleShowModal = () => {
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

    const handleSort = (e) => {
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
            <div className="row mb-3 customer-header">                
                <div className="col-md-4">
                    <input type="text" value={query} onChange={handleSearchChange} placeholder="search customer" className="form-control" /> 
                </div>
                <div className="col-md-4">
                    <select name="sort" className="form-select" value={orderBy} onChange={handleSort} placeholder="Sort customers">
                        <option value="">Sort customers</option>
                        <option value="ascending">Sort by name - ascending</option>
                        <option value="descending">Sort by name - descending</option>
                    </select>
                </div> 
                <div className="col-md-4">
                    <button className="btn add" onClick={handleShowModal}>Add Customer</button>
                </div>
            </div>

            <h4 style={{marginLeft: '15px'}}>Listing Customers - { searchResults.length }</h4>
            
            <div className="row mt-3">
                <div className="col-md-10">
                    {searchResults.length > 0 &&
                        searchResults.map(customer => {
                            return <CustomerItem key={customer._id} 
                                                 {...customer} 
                                                 removeCustomer={removeCustomer} />
                        })
                    }
                    { showModal &&
                        <AddCustomer showModal={showModal} handleShowModal={handleShowModal} />
                    }
                </div>
            </div>
        </>
    )
}

export default CustomersList