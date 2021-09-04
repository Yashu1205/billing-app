import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Select from 'react-select'
// import { DateTime } from 'luxon'

const today = new Date()

const BillForm = (props) => {
    const [ startDate, setStartDate ] = useState(today.toISOString().substr(0, 10))
    const [ customer, setCustomer ] = useState('')
    const [ product, setProduct ] = useState('')
    const [ cartItems, setCartItems ] = useState([])
    const [ quantity ,setQuantity ] = useState(1)
    const [ formErrors, setFormErrors] = useState({})
    const errors = {}

    const { customers, products, showModal, handleShowModal, formSubmission } = props

    const customerOptions = customers.map(customer => {
        return {'value': customer._id, 'label': customer.name}
    })
    const productOptions = products.map(product => {
        return {'value': product._id, 'label': product.name}
    })
    
    const handleChange = (e) => {
        setStartDate(e.target.value)
    }
    const handleCustomerChange = (data) => {
        setCustomer(data)
    }
    const handleProductChange = (product) => {
        setProduct(product)
    }

    const addToCart = (e) => {
        e.preventDefault()
        const newCartItem = {id: product.value, name: product.label, quantity: quantity}
        setCartItems([newCartItem, ...cartItems])
        setProduct('')
    }

    const handleQuantity = (id, count) => {
        const newCartResult = cartItems.map(cartItem => {
            if(cartItem.id === id){
                return {...cartItem, quantity: cartItem.quantity+count }
            }
            else{
                return {...cartItem}
            }
        })
        setCartItems(newCartResult)
    }

    const removeItemFromCart = (id) => {
        const cartResult = cartItems.filter(item => item.id !== id)
        setCartItems(cartResult)
    }
    const runValidations = () => {
        if(customer === ''){
            errors.customer = 'customer is required'
        }
        if(cartItems.length === 0){
            errors.product = 'product is required'
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()

        const lineItems = cartItems.map(cartItem => {
            return {product: cartItem.id, quantity: cartItem.quantity}
        })

        if(Object.keys(errors).length > 0){
            setFormErrors(errors)
        }
        else{
            setFormErrors({})
            const formData = {
                date: startDate,
                customer: customer.value,
                lineItems: lineItems
            }
            formSubmission(formData)
        }
    }

    return (
        <Modal show={showModal } size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create New Bill
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <input type="date" className="form-control" name="date"  
                                   value={startDate} 
                                   onChange={handleChange} />
                            </div>
                            <div div className="mb-2">
                                <Select name="customer" 
                                        value={customer} 
                                        onChange={handleCustomerChange} 
                                        options={customerOptions} />
                                {formErrors.customer && <span className="text-danger">{formErrors.customer}</span>}
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-10">
                                    <Select name="product" 
                                            value={product} 
                                            onChange={handleProductChange} 
                                            options={productOptions} />
                                    {formErrors.product && <span className="text-danger">{formErrors.product}</span>} 

                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-sm btn-primary" onClick={addToCart}>Add</button> <br/>     

                                </div>
                            </div>

                            <input type="submit" value="save" className="btn btn-primary btn-sm" />
                            <button onClick={handleShowModal } className="btn btn-secondary btn-sm" style={{marginLeft: '5px'}}>Cancel</button>
                        
                        </form>
                    </div>
                    <div className="col-md-6">
                        {
                            cartItems.length > 0 &&
                            
                            <table className="table table-borderless">
                                <thead>
                                    <tr>  
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    { cartItems.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>
                                                    <button className="btn btn-light" onClick={() => handleQuantity(item.id,-1)}
                                                            disabled={item.quantity === 1}> - </button>
                                                        {item.quantity}x
                                                    <button className="btn btn-light"  onClick={() => handleQuantity(item.id, 1)}> + </button>
                                                </td>
                                                <td>
                                                    <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
                                                </td>
                                            </tr>
                                        )
                                        })
                                    }
                                </tbody>

                            </table>
                        }
                    </div>
                </div>    

                
            </Modal.Body>
        </Modal>
    )
}

export default BillForm