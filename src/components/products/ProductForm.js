import { useState } from 'react'
import { Modal } from 'react-bootstrap'

const ProductForm = (props) => {
    const { name: productName, price: productPrice, showModal, handleModal, formSubmission } = props
    const [name, setName] = useState(productName ? productName : '')
    const [price, setPrice] = useState(productPrice ? productPrice : '') 
    
    const handleChange = (e) => {
        const inputName = e.target.name
        if(inputName === 'name'){
            setName(e.target.value)
        } else{
            setPrice(e.target.value)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: name,
            price: price
        }
        formSubmission(formData)
    }

    return (
        <Modal show={showModal } size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
               Add New Product
            </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <label >Name</label><br/>
                    <input type="text" className="form-control" name="name" value={name} onChange={handleChange} /><br/>

                    <label>Price</label><br/>
                    <input type="text" className="form-control" name="price" value={price} onChange={handleChange} /><br/>

                    <input type="submit" value="save"/>
                    <button onClick={handleModal }>Close</button>
                </form>
            </Modal.Body>

        </Modal>
    )
}

export default ProductForm