import { useEffect, useState } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { startDeleteCustomer } from '../../actions/customersAction'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import PaginationTable from '../PaginationTable'
import formatDataForPagination from '../../helpers/formatDataForPagination'
import { getSearchResult } from '../../helpers/search'
import getSortedResult from '../../helpers/sort'
import CustomerItem from "./CustomerItem"
import AddCustomer from "./AddCustomer"

import '../../styles/header.css'

const CustomersList = (props) => {
    const  perPage = 5
    const [query, setQuery] = useState('')
    const [orderBy, setOrderBy] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(perPage)

    const dispatch = useDispatch()
    const { customers } = useSelector(state => state.customers )

    useEffect(() => {
        setSearchResults([...customers])
    },[customers])

    //toggle modal open/close
    const handleShowModal = () => {
        setShowModal(!showModal)
    }

    const removeCustomer = (id) => {
        dispatch(startDeleteCustomer(id))
    } 

    //get search result with getSearchResult() helper
    const handleSearchChange = (e) => {
        const searchInput = e.target.value
        setQuery(searchInput)
        const result = getSearchResult(customers, searchInput, 'customers')
        setSearchResults(result)
    }    
    
    //get sort result with getSortedResult() helper
    const handleSort = (e) => {
        setOrderBy(e.target.value)
        let sortedCustomers = []
        
        if(e.target.value === 'ascending'){
            sortedCustomers = getSortedResult(searchResults, 'name')
        } else if(e.target.value === 'descending'){
            sortedCustomers = getSortedResult(searchResults, 'name').reverse()
        } else {
            sortedCustomers = [...customers]
        }
        setSearchResults(sortedCustomers)     
    }

    //handle pagination, set page start and end index with formatDataForPagination() helper 
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
                    <input type="text" value={query} onChange={handleSearchChange} placeholder="Search customers by name" className="form-control" /> 
                </div>
                <div className="col-md-4">
                    <select name="sort" className="form-select" value={orderBy} onChange={handleSort} placeholder="Order customers by:">
                        <option value="">Order customers by</option>
                        <option value="ascending">Name - ascending</option>
                        <option value="descending">Name - descending</option>
                    </select>
                </div> 
                <div className="col-md-4">
                    <button className="btn add" onClick={handleShowModal}>
                        <BsFillPersonPlusFill size="1.5em"/> 
                    </button>
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
                    <PaginationTable currentPage={currentPage} perPage={perPage} totalData={searchResults.length}
                                     handleClick={handleClick} />
            }
        </>
    )
}

export default CustomersList