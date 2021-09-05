import { useEffect, useState } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { startDeleteCustomer } from "../../actions/customersAction"
import PaginationTable from '../PaginationTable'
import formatDataForPagination from '../../helpers/formatDataForPagination'
import getSearchResult from '../../helpers/search'
import getSortedResult from '../../helpers/sort'
import CustomerItem from "./CustomerItem"
import AddCustomer from "./AddCustomer"

import '../../css/header.css'

const CustomersList = (props) => {
    const  perPage = 5
    const [query, setQuery] = useState('')
    const [orderBy, setOrderBy] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(perPage)

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

    const handleSearchChange = (e) => {
        const searchInput = e.target.value
        setQuery(searchInput)
        const result = getSearchResult(customers, searchInput, 'customers')
        setSearchResults(result)
    }    
    
    const handleSort = (e) => {
        setOrderBy(e.target.value)
        let sortedCustomers = []
        if(e.target.value === 'ascending'){
            sortedCustomers = getSortedResult(customers, 'customers')
        } else if(e.target.value === 'descending'){
            sortedCustomers = getSortedResult(customers, 'customers').reverse()
        } else {
            sortedCustomers = [...customers]
        }
        setSearchResults(sortedCustomers)     
    }

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber)
        const formatData = formatDataForPagination(pageNumber, perPage)
        
        setStartIndex(formatData.startIndex)
        setEndIndex(formatData.endIndex)
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
                    <button className="btn add" onClick={handleShowModal}>Add New Customer</button>
                </div>
            </div>

            <h4 style={{marginLeft: '15px'}}>Listing Customers - { searchResults.length }</h4>
            
            <div className="row mt-3">
                <div className="col-md-10">
                    {searchResults.length > 0 ? (
                        searchResults.slice(startIndex, endIndex).map(customer => {
                            return <CustomerItem key={customer._id} 
                                                 {...customer} 
                                                 removeCustomer={removeCustomer} />
                        })  ) : (
                            <div className="card">
                                <div className="card-body">
                                    <h5>No Customers</h5>
                                    <h6>Add New Customer</h6>
                                </div>
                            </div>
                        )
                    }
                    { showModal &&
                        <AddCustomer showModal={showModal} handleShowModal={handleShowModal} />
                    }
                </div>
            </div>

            {searchResults.length > 0 &&
                <div >
                    <PaginationTable currentPage={currentPage} perPage={perPage} totalData={customers.length}
                                     handleClick={handleClick} />
                </div>
            }
        </>
    )
}

export default CustomersList