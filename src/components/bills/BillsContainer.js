import React, { Suspense} from 'react'
import '../../css/navbar.css'
import {ClipLoader} from 'react-spinners'
const BillsList = React.lazy(() => import('./BillsList'))

const BillsContainer = (props) => {

    const override = {
        display: 'block',
        margin: '50px auto',
        borderColor: '#37a37b'
    }

    return (
        <div className="container mt-3 item-container">
            <Suspense fallback={<ClipLoader color="#ffffff" loading={true} css={override} size={100} />}>
                <BillsList />
            </Suspense>
        </div>
    )
}

export default BillsContainer