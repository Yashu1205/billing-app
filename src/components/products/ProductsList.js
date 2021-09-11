import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsPlusCircleFill } from 'react-icons/bs'
import { startDeleteProduct } from "../../actions/productsAction"
import { getSearchResult } from "../../helpers/search"
import getSortedResult from '../../helpers/sort'
import PaginationTable from '../PaginationTable'
import formatDataForPagination from "../../helpers/formatDataForPagination"
import ProductItem from "./ProductItem"
import AddProduct from "./AddProduct"

const ProductsList = (props) => {
    const perPage = 5

    const [showModal, setShowModal] = useState(false)
    const [query, setQuery] = useState('')
    const [orderBy, setOrderBy] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(perPage)

    const dispatch = useDispatch()
    const { products } = useSelector((state) => {
        return state.product
    })
    
    useEffect(() => {
        setSearchResults([...products])
    },[products])

    const handleShowModal = () => setShowModal(!showModal)
    
    const removeProduct = (id) => {
        dispatch(startDeleteProduct(id))
    }

    const handleSearchChange = (e) => {
        const searchInput = e.target.value
        setQuery(searchInput)
        const productSearchResult = getSearchResult(products, searchInput, 'products')
        setSearchResults(productSearchResult)
    } 

    // const getSortedResult = (key) => {
    //     let result = []
        
    //     if(key === 'name'){
    //         result = searchResults.sort((a,b) => {
    //             const aName =  a.name.toLowerCase(),   bName = b.name.toLowerCase()
    
    //             if(aName < bName){
    //                 return -1
    //             }
    //             if(aName > bName){
    //                 return 1
    //             }
    //             return 0
    //         })
    //     } 
    //     else{
    //         result = searchResults.sort((a,b) => a.price - b.price)
    //     }
    //     return result
    // }

    const handleSort = (e) => {
        const inputValue = e.target.value
        setOrderBy(inputValue)
        let sortedProducts = []

        if(inputValue === 'nameAsc'){
            sortedProducts = getSortedResult(searchResults,'name')
        }
        else if(inputValue === 'nameDesc'){
            sortedProducts = getSortedResult(searchResults,'name').reverse()
        }
        else if(inputValue === 'priceAsc'){
            sortedProducts = getSortedResult(searchResults,'price')
        }
        else if(inputValue === 'priceDesc'){
            sortedProducts = getSortedResult(searchResults,'price').reverse()
        }
        else {
            sortedProducts = [...products]
        }
        setSearchResults(sortedProducts)
    }

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber)
        const formatData = formatDataForPagination(pageNumber, perPage)
        
        setStartIndex(formatData.startIndex)
        setEndIndex(formatData.endIndex)
    }

    return(
        <>
            <div className="row mb-3 customer-header">                
                <div className="col-md-4">
                    <input type="text" value={query} onChange={handleSearchChange} placeholder="search product" className="form-control" /> 
                </div>
                <div className="col-md-4">
                    <select name="sort" className="form-select" value={orderBy} onChange={handleSort} placeholder="Sort customers">
                        <option value="">Sort products by</option>
                        <option value="nameAsc">Name - ascending</option>
                        <option value="nameDesc">Name - descending</option>
                        <option value="priceAsc">Price - ascending</option>
                        <option value="priceDesc">Price - descending</option>
                    </select>
                </div> 
                <div className="col-md-4">
                    <button className="btn add" onClick={handleShowModal} >
                        <BsPlusCircleFill size="1.5em"/>    
                    </button>
                </div>
            </div>

            <h4 style={{marginLeft: '15px'}}>Listing Products - { searchResults.length }</h4>

            <div className="row mt-3">
                <div className="col-md-10">
                    {searchResults.length > 0 ? (
                            searchResults.slice(startIndex, endIndex).map(product => {
                                return <ProductItem key={product._id} 
                                                    {...product} 
                                                    removeProduct={removeProduct} />
                            })
                        ) : (
                            <div className="card">
                                <div className="card-body">
                                    <h5>No Products</h5>
                                    <h6>Add New Product</h6>
                                </div>
                            </div>
                        )
                    }
                    { showModal &&
                        <AddProduct showModal={showModal} handleShowModal={handleShowModal} />
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

export default ProductsList