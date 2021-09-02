import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker' 
import "react-datepicker/dist/react-datepicker.css";

const BillForm = (props) => {
    const [ startDate, setStartDate ] = useState(new Date())
    const [ customer, setCustomer ] = useState('')
    const [ product, setProduct ] = useState('')
    const [ lineItems, setLineItems ] = useState([])
    const [ cartItems, setCartItems ] = useState([])
    const [ quantity ,setQuantity ] = useState(1)
    const [ formErrors, setFormErrors] = useState({})
    const errors = {}

    const { customers, products, showModal, handleModal, formSubmission } = props

    const handleChange = (e) => {
        const inputName = e.target.name
        if(inputName === 'customer'){
            setCustomer(e.target.value)
        }
        else if(inputName === 'date'){
            setStartDate(e.target.value)
        }
        else{
            setProduct(e.target.value)
        }
    }

    const addToCart = (e) => {
        e.preventDefault()
        const newItem = {product: product, quantity: quantity}
        setLineItems([newItem, ...lineItems])

        const itemName = products.find(prod => product === prod._id).name
        const newCartItem = {id: product, name: itemName, quantity: quantity}
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
        if(startDate.trim().length === 0){
            errors.date = 'date is required'
        } 
        if(customer.trim().length === 0){
            errors.customer = 'customer is required'
        }
        if(lineItems.length === 0){
            errors.product = 'product is required'
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
                date: startDate,
                customer: customer,
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
                            <input type="date" className="form-control" name="date" value={startDate} onChange={handleChange} /><br/>
                            
                            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                            <select className="form-control" name="customer" value={customer} onChange={handleChange}>
                                <option value="">Select Customer</option>
                                {   customers.length > 0 &&
                                    customers.map(customer => {
                                        return <option key={customer._id} value={customer._id}>{customer.name}</option>
                                    })
                                }
                            </select><br/>
                            {formErrors.customer && <span className="text-danger">{formErrors.customer}</span>}
                            
                            <div className="row">
                                <div className="col-md-10">
                                    <select className="form-control" name="product" value={product} onChange={handleChange}>
                                        <option value="">Select Product</option>
                                        {   products.length > 0 &&
                                            products.map(product => {
                                                return <option key={product._id} value={product._id}>{product.name}</option>
                                            })
                                        }
                                    </select><br/> 
                                    {formErrors.product && <span className="text-danger">{formErrors.product}</span>} 

                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-sm btn-primary mb-2" onClick={addToCart}>Add</button> <br/>     

                                </div>
                            </div>

                            <input type="submit" value="save" className="btn btn-primary btn-sm" />
                            <button onClick={handleModal } className="btn btn-secondary btn-sm">Cancel</button>
                        
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