import { useDispatch, useSelector } from "react-redux"
import ProductItem from "./ProductItem"
import { startDeleteProduct } from "../../actions/productsAction"

const ProductsList = (props) => {
    const { handleModal } = props
    const { products } = useSelector((state) => {
        return state.product
    })
    const dispatch = useDispatch()

    const removeProduct = (id) => {
        dispatch(startDeleteProduct(id))
    }

    return(
        <>
            <div className="row">
                <div className="col-md-8">
                    <h3>Listing Products - { products.length }</h3>
                </div>
                <div className="col-md-4">
                    <button onClick={handleModal}>Add new product</button> 
                </div> 
            </div>
            {products.length > 0 &&
                products.map(product => {
                    return <ProductItem key={product._id} {...product}  removeProduct={removeProduct} />
                })
            }
            
        </>
    )
}

export default ProductsList