import React, { Suspense } from 'react'
import { ClipLoader } from "react-spinners";
import '../../css/header.css'
const CustomersList = React.lazy(() => import('./CustomersList'))

const CustomersContainer = (props) => {

    const override = {
        display: 'block',
        margin: '50px auto',
        borderColor: '#37a37b'
    }

    return (
        <div className="container mt-3 item-container">
            <Suspense fallback={ <ClipLoader color="#ffffff" loading={true} css={override} size={100} />} >
                <CustomersList />
            </Suspense>
        </div>
    )
}

export default CustomersContainer