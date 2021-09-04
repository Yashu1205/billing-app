import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startDeleteProduct } from "../../actions/productsAction"
import ProductItem from "./ProductItem"
import '../../css/header.css'

const ProductsList = (props) => {
    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const { products } = useSelector((state) => {
        return state.product
    })
    const dispatch = useDispatch()

    const { handleModal } = props

    useEffect(() => {
        setSearchResults([...products])
    },[products])

    const removeProduct = (id) => {
        dispatch(startDeleteProduct(id))
    }

    const handleSearchChange = (e) => {
        const searchInput = e.target.value
        setQuery(searchInput)
        getSearchResult(searchInput)
    } 

    const getSearchResult = (query) => {
        const result = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()) )
        setSearchResults(result)
    }

    return(
        <>
            <div className="row mb-3 customer-header">                
                <div className="col-md-4">
                    <input type="text" value={query} onChange={handleSearchChange} placeholder="search product" className="form-control" /> 
                </div>
                <div className="col-md-4">
                    {/* <select name="sort" className="form-select" value={orderBy} onChange={handleSort} placeholder="Sort customers">
                        <option value="">Sort customers</option>
                        <option value="ascending">Sort by name - ascending</option>
                        <option value="descending">Sort by name - descending</option>
                    </select> */}
                </div> 
                <div className="col-md-4">
                    <button className="btn add" onClick={handleModal}>Add new product</button>
                </div>
            </div>

            <h4>Listing Products - { products.length }</h4>

            <div className="row mt-3">
                <div className="col-md-10">
                    {searchResults.length > 0 &&
                        searchResults.map(product => {
                            return <ProductItem key={product._id} {...product}  removeProduct={removeProduct} />
                        })
                    }
                    { showModal &&
                        <AddProduct showModal={showModal} handleShowModal={handleShowModal} />
                    }
                </div>
            </div>
            
        </>
    )
}

export default ProductsList