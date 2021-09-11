import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startDeleteBill } from '../../actions/billsAction'
import { getCustomerName } from '../../helpers/getName'
import { getBillsSearchResult } from '../../helpers/search'
import { BsFilePlus } from 'react-icons/bs'
import PaginationTable from '../PaginationTable'
import formatDataForPagination from '../../helpers/formatDataForPagination'
import BillItem from './BillItem'
import AddBill from './AddBill'

const BillsList = (props) => {
    const perPage = 5
    const [ searchInput, setSearchInput] = useState('')
    const [orderBy, setOrderBy] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(perPage)

    const dispatch = useDispatch() 
    const { customers } = useSelector((state) => {
        return state.customer
    })    
    const  { bills } = useSelector((state) => {
        return state.bill
    })

    useEffect(() => {
        setSearchResults([...bills])
    }, [bills])

    const handleShowModal = () => {
        setShowModal(!showModal)
    }
    
    const removeBill = (id) => {
        dispatch(startDeleteBill(id))
    }

    const handleSearch = (e) => {
        const inputSearch = e.target.value
        setSearchInput(inputSearch)
        const billsSearchResult = getBillsSearchResult(customers, bills, inputSearch)
        setSearchResults(billsSearchResult)
    }

    const getSortedResult = (key) => {
        let result = []
        if(key === 'name'){
            result = searchResults.sort((a,b) => {
                const customerA =  customers.find(cust => cust._id === a.customer)
                const customerB =  customers.find(cust => cust._id === b.customer)
                const aName = customerA.name.toLowerCase(),   bName = customerB.name.toLowerCase()
    
                if(aName < bName){
                    return -1
                }
                if(aName > bName){
                    return 1
                }
                return 0
            })
        }
        else{
            result = searchResults.sort((a, b) => {
                return new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse());
            })
        }
        return result
    }

    const handleSort = (e) => {
        setOrderBy(e.target.value)
        let result = []
        if(e.target.value === 'nameAsc'){
            result = getSortedResult('name')
        } else if(e.target.value === 'nameDesc'){
            result = getSortedResult('name').reverse()
        }else if(e.target.value === 'dateAsc'){
            result = getSortedResult('date')
        } else if(e.target.value === 'dateDesc'){
            result = getSortedResult('date').reverse()
        }else{
            result = [...bills]
        }
        setSearchResults(result)
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
                    <input type="text" value={searchInput} onChange={handleSearch} placeholder="search bills by customer name" className="form-control" /> 
                </div>
                <div className="col-md-4">
                    <select name="sort" className="form-select" value={orderBy} onChange={handleSort} placeholder="Sort customers">
                        <option value="">Order bills by</option>
                        <option value="nameAsc">customer name - ascending</option>
                        <option value="nameDesc">customer name - descending</option>
                        <option value="dateAsc">date - ascending</option>
                        <option value="dateDesc">date - descending</option>
                    </select>
                </div> 
                <div className="col-md-4">
                    <button className="btn add" onClick={handleShowModal}>
                        <BsFilePlus size="1.5em" />
                    </button>
                </div>
            </div>
            <h4 style={{marginLeft: '15px'}}>Listing Bills - {searchResults.length} </h4>

            <div className="row mt-3">
                <div className="col-md-10">
                    {searchResults.length > 0 && customers.length > 0 &&
                        searchResults.slice(startIndex, endIndex).map(bill => {
                            return <BillItem key={bill._id}
                                                 {...bill} 
                                                 customerInfo={getCustomerName(customers, bill.customer)}
                                                 removeBill={removeBill} />
                        })
                    }
                    { showModal &&
                        <AddBill showModal={showModal} handleShowModal={handleShowModal} />
                    }
                </div>
            </div>

            {searchResults.length > 0 &&
                <div >
                    <PaginationTable currentPage={currentPage} perPage={perPage} totalData={searchResults.length}
                                     handleClick={handleClick} />
                </div>
            }

        </>
    )
}

export default BillsList