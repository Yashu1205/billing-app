import '../../styles/header.css'
import ProductsList  from './ProductsList'

const ProductsContainer = (props) => {
    return (
        <div className="container item-container">
            <ProductsList />
        </div>
    )
}

export default ProductsContainer