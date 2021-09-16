import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Select from 'react-select'
import { FaCartPlus } from 'react-icons/fa'
import { BsXSquareFill } from 'react-icons/bs'

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
    
    //set date field
    const handleChange = (e) => {
        setStartDate(e.target.value)
    }
    //set customer field
    const handleCustomerChange = (data) => {
        setCustomer(data)
    }
    //set product field 
    const handleProductChange = (product) => {
        setProduct(product)
    }
    //get product price to get the subtotal
    const getProductPrice = (productId) => {
        const product = products.find(prod => prod._id === productId )
        return product.price
    }

    //on adding product on cart, update cart items
    const addToCart = (e) => {
        e.preventDefault()
        const existingItem = cartItems.find(item => item.id === product.value)
        if(existingItem){
            const newCartItems = cartItems.map(item => {
                if(item.id === product.value){
                    return {...item, quantity: item.quantity + 1, subtotal: getProductPrice(product.value) + item.subtotal}
                } else{
                    return {...item}
                }
            }) 
            setCartItems(newCartItems)
        }
        else{
            const newCartItem = {id: product.value, name: product.label, quantity: quantity, price: getProductPrice(product.value), subtotal: getProductPrice(product.value)*quantity}
            setCartItems([newCartItem, ...cartItems])
        }
        setProduct('')
    }

    //handle increment or decrement of product quantity
    const handleQuantity = (id, count) => {
        const newCartResult = cartItems.map(cartItem => {
            if(cartItem.id === id){
                let newItemCount = cartItem.quantity + count 
                return {...cartItem, quantity: newItemCount , subtotal: newItemCount * getProductPrice(id)}
            }
            else{
                return {...cartItem}
            }
        })
        setCartItems(newCartResult)
    }

    //remove cart item
    const removeItemFromCart = (id) => {
        const cartResult = cartItems.filter(item => item.id !== id)
        setCartItems(cartResult)
    }

    //get cart total
    const getCartTotal = cartItems.reduce((accu, current) => accu+current.subtotal, 0) 

    //run validations on submit 
    const runValidations = () => {
        if(customer === ''){
            errors.customer = 'customer is required'
        }
        if(cartItems.length === 0){
            errors.product = 'product is required'
        }
    }

     //if no errors, call formSubmission() in parent component that dispatches action to generate bill   
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
            handleShowModal()
            formSubmission(formData)
        }
    }

    //close modal on cancel
    const handleCancel = (e) => {
        e.preventDefault()
        handleShowModal()
    }

    return (
        <Modal show={showModal}
               onHide={() => {}}
               size="lg" 
               aria-labelledby="contained-modal-title-vcenter" 
               centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create New Bill
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="row">
                    <div className="col-md-5">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <input type="date" className="form-control" name="date"  
                                       value={startDate} 
                                       onChange={handleChange} />
                            </div>

                            <div className="mb-2">
                                <Select name="customer" 
                                        value={customer} 
                                        placeholder="select customer"
                                        onChange={handleCustomerChange} 
                                        options={customerOptions} />
                                {formErrors.customer && <span className="text-danger">{formErrors.customer}</span>}
                            </div>

                            <div className="row mb-2">
                                <div className="col-md-10">
                                    <Select name="product" 
                                            value={product} 
                                            placeholder="select product"
                                            onChange={handleProductChange} 
                                            options={productOptions} />
                                    {formErrors.product && <span className="text-danger">{formErrors.product}</span>} 

                                </div>

                                <div className="col-md-2">
                                    <button className="btn btn-sm btn-primary" onClick={addToCart} disabled={!product}>
                                        <FaCartPlus size="1.5em"/>    
                                    </button> <br/>     

                                </div>
                            </div>

                            <input type="submit" value="Generate" className="btn btn-primary btn-sm" />
                            <button onClick={handleCancel }className="btn btn-link btn-sm" style={{textDecoration:'none', marginLeft:"5px"}}>
                                Cancel
                            </button>
                        
                        </form>
                    </div>
                    <div className="col-md-7"  style={{maxHeight: '260px', overflowY:'scroll'}}>
                        {
                            cartItems.length > 0 &&
                            
                            <table className="table table-borderless">
                                <thead>
                                    <tr>  
                                        <th>Item</th>
                                        <th>Qty</th>
                                        <th>Remove</th>
                                        <th>Price</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    { cartItems.map(item => {
                                        return (
                                            
                                            <tr key={item.id}>
                                                <td>{item.name.slice(0,12)}</td>
                                                <td>
                                                    <button className="btn btn-light btn-sm " onClick={() => handleQuantity(item.id,-1)}
                                                            disabled={item.quantity === 1}> - </button>
                                                        {item.quantity}x
                                                    <button className="btn btn-light btn-sm"  onClick={() => handleQuantity(item.id, 1)}> + </button>
                                                </td>
                                                <td>
                                                    <button onClick={() => removeItemFromCart(item.id)} className="btn btn-sm">
                                                        <BsXSquareFill size="1.3em"/>
                                                    </button>
                                                </td>
                                                <td>{item.price}</td> 
                                                <td>{item.subtotal}</td>
                                            </tr>                                            
                                        )
                                        }) 
                                    }
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Total</td>
                                        <td>{getCartTotal}</td>
                                    </tr> 
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