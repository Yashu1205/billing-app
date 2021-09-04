import { useState } from 'react'
import { Modal } from 'react-bootstrap'

const ProductForm = (props) => {
    const { name: productName, price: productPrice, title, showModal, handleShowModal, formSubmission } = props
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

    const handleError = (e) => {
        const inputValue = e.target.value
        if(inputValue.trim().length === 0){
            setFormErrors({...formErrors, [e.target.name]: `${e.target.name} is required`})
        } else{
            const errors = {...formErrors}
            delete errors[e.target.name]
            setFormErrors({...errors})
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

    const handleCancel = (e) => {
        e.preventDefault()
        handleShowModal()
    }

    return (
        <Modal show={showModal } size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    { title ? title : 'Update Product'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit}>
                <div className="row mb-2">
                        <div className="col-md-3">
                            <label >Name*: </label><br/>
                        </div>  
                        <div className="col-md-9">
                        <input type="text" className="form-control"
                                name="name" 
                                value={name} 
                                onChange={handleChange}
                                onBlur={handleError}
                                placeholder="Enter name"
                            />
                        { formErrors.name && <span className="text-danger"> {formErrors.name}<br/> </span> }
                        </div>  
                    </div> 
                    <div className="row mb-2">
                        <div className="col-md-3">
                            <label >Price*:</label><br/>
                        </div>  
                        <div className="col-md-9">
                        <input type="text" className="form-control"
                                name="price" 
                                value={price} 
                                onChange={handleChange}
                                onBlur={handleError}
                                placeholder="Enter price"
                            />
                        { formErrors.price && <span className="text-danger"> {formErrors.price}<br/> </span> }
                        </div>  
                    </div>

                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-9">
                            <input type="submit" value={title ? "save" : "update"} className="btn btn-primary " style={{marginRight: '5px'}}/>
                            <button onClick={handleCancel } className="btn btn-secondary">Cancel</button>
                        </div>    
                    </div>
                </form>
            </Modal.Body>

        </Modal>
    )
}

export default ProductForm