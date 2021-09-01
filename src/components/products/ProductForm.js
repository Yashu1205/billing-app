import { useState } from 'react'
import { Modal } from 'react-bootstrap'

const ProductForm = (props) => {
    const { name: productName, price: productPrice, showModal, handleModal, formSubmission } = props
    const [name, setName] = useState(productName ? productName : '')
    const [price, setPrice] = useState(productPrice ? productPrice : '') 
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const handleChange = (e) => {
        const inputName = e.target.name
        if(inputName === 'name'){
            setName(e.target.value)
        } else{
            setPrice(e.target.value)
        }
    }

    const runValidations = () => {
        if(name.trim().length === 0){
            errors.name = 'name is required'
        }
        if(price.trim().length === 0){
            errors.price = 'price is required'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length > 0){
            setFormErrors(errors)
        }
        else{
            setFormErrors({})
            const formData = {
                name: name,
                price: price
            }
            formSubmission(formData)
        }
    }

    return (
        <Modal show={showModal } size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Product
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <label >Name</label><br/>
                    <input type="text" className="form-control" name="name" value={name} onChange={handleChange} />
                    {formErrors.name && <span className="text-danger">{formErrors.name} <br/></span>}
                    
                    <label>Price</label><br/>
                    <input type="text" className="form-control" name="price" value={price} onChange={handleChange} />
                    {formErrors.price && <span className="text-danger">{formErrors.price} <br/></span>}
                    <br />

                    <input type="submit" value="save" className="btn btn-primary btn-sm" />
                    <button onClick={handleModal } className="btn btn-secondary btn-sm">Cancel</button>
                </form>
            </Modal.Body>

        </Modal>
    )
}

export default ProductForm