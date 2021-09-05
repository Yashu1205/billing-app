import React, { Suspense } from 'react'
import { ClipLoader } from "react-spinners";
import '../../css/header.css'
const ProductsList = React.lazy(() => import('./ProductsList'))

const ProductsContainer = (props) => {

    const override = {
        display: 'block',
        margin: '50px auto',
        borderColor: '#37a37b'
    }

    return (
        <div className="container mt-3 item-container">
            <Suspense fallback={ <ClipLoader color="#ffffff" loading={true} css={override} size={100} />} >
                <ProductsList />
            </Suspense>
        </div>
    )
}

export default ProductsContainer