import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { startGetProducts } from "../../actions/productsAction"
import ProductsList from "./ProductsList"
import AddProduct from "./AddProduct"

const ProductsContainer = (props) => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(startGetProducts())
    // },[])

    const handleModal = () => {
        setShowModal(!showModal)
    }

    return(
        <div className="container mt-3">
            <ProductsList handleModal={handleModal}/>
            {/* <AddProduct showModal={showModal} handleModal={handleModal} /> */}
        </div>
    )
}

export default ProductsContainer