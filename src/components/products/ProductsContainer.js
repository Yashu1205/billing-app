import ProductsList  from './ProductsList'
import '../../styles/header.css'

const ProductsContainer = (props) => {
    return (
        <div className="container item-container">
            <ProductsList />
        </div>
    )
}

export default ProductsContainer