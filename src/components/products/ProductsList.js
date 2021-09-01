import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startDeleteProduct } from "../../actions/productsAction"
import ReactPaginate from 'react-paginate'
import ProductItem from "./ProductItem"



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
            <div className="row">
                <div className="col-md-4">
                    <h3>Listing Products - { products.length }</h3>
                </div>
                <div className="col-md-4">
                    <input type="text" name="query" value={query} onChange={handleSearchChange} placeholder="search product" />
                </div>
                <div className="col-md-4">
                    <button onClick={handleModal}>Add new product</button> 
                </div> 
            </div>
            {searchResults.length > 0 &&
                searchResults.map(product => {
                    return <ProductItem key={product._id} {...product}  removeProduct={removeProduct} />
                })
            }
            
        </>
    )
}

export default ProductsList