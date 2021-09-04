import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startDeleteBill } from '../../actions/billsAction'
import BillItem from './BillItem'

const BillsList = (props) => {
    const [ searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const { handleModal } = props
    let finalResult = []

    const dispatch = useDispatch() 
    const { customers } = useSelector((state) => {
        return state.customer
    })    
    const  { bills } = useSelector((state) => {
        return state.bill
    })
    console.log(bills)

    useEffect(() => {
        setSearchResults([...bills])
    }, [bills])
    
    const removeBill = (id) => {
        dispatch(startDeleteBill(id))
    }

    const handleSearch = (e) => {
        const inputSearch = e.target.value
        setSearchInput(inputSearch)
        getSearchResult(inputSearch)
    }

    const getSearchResult = (searchInput) => {
        const customerBills = customers.filter(customer => customer.name.toLowerCase().includes(searchInput.toLowerCase()))
        customerBills.forEach((custBill) => {
            const result = bills.filter(bill => bill.customer === custBill._id)
            finalResult = finalResult.concat(result)
        })
        setSearchResults(finalResult)
    }

    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <h3>Listing Bills - { bills.length }</h3>
                </div>
                <div className="col-md-4">
                    <input type="text"  value={searchInput} onChange={handleSearch} placeholder="search by customer's name" className="form-control" /> 
                </div>
                <div className="col-md-4">
                    <button className="btn btn-primary" style={{float: 'right'}} onClick={handleModal}>Add new bill</button> 
                </div> 
            </div>
            <div className="row">
                {searchResults.length > 0 && customers.length > 0 &&
                    searchResults.map(bill => {
                        return <BillItem key={bill._id} {...bill}   
                                         removeBill={removeBill} />
                    })
                }

            </div>


        </>
    )
}

export default BillsList