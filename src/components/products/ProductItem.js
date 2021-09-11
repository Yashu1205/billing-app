import { useState } from 'react'
import Swal from 'sweetalert2'
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs'
import EditProduct from './EditProduct'

const ProductItem = (props) => {
    const [showModal, setShowModal] = useState(false)
    const { _id, name, price, removeProduct} = props

    const handleShowModal = () => setShowModal(!showModal)

    const handleRemoveProduct = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        })
       .then((result) => {
            if (result.isConfirmed) {
                removeProduct(_id)
            }
       })
    }

    return(
        <div className="card mb-3">
            <div className="row">
                <div className="col-md-8 detail">
                    <pre style={{margin:'20px'}}>{name}     Rs.{price}</pre>
                </div>
                <div className="col-md-4 action">
                    <button className="btn btn-sm btn-danger" onClick={handleRemoveProduct}>
                        <BsFillTrashFill size="1.5em" />
                    </button>
                    <button className="btn btn-sm btn-info" onClick={handleShowModal}>
                        <BsPencilSquare size="1.5em" />
                    </button>
                </div>
            </div>
            {
                showModal && <EditProduct id={_id} name={name} price={price} 
                                        showModal={showModal}
                                        handleShowModal={handleShowModal}/>
            }
        </div>

    )
}

export default ProductItem