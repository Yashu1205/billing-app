import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import isEmail from 'validator/lib/isEmail'

const CustomerForm = (props) => {
    const { name: custName, email: custEmail, mobile: custMobile, title, formSubmission, showModal, handleShowModal } = props
    const [name, setName] = useState(custName ? custName : '')
    const [email, setEmail] = useState(custEmail ? custEmail : '')
    const [mobile, setMobile] = useState(custMobile ? custMobile : '')
    const [formErrors, setFormErrors] = useState({})
    let errors = {}    

    //set input value to state
    const handleChange = (e) => {
        const inputName = e.target.name
        if(inputName === "name"){
            setName(e.target.value)
        } else if(inputName === "email"){
            setEmail(e.target.value)
        } else{
            setMobile(e.target.value)
        }
    }

    //run validation on blur on input
    const handleError = (e) => {
        const inputName = e.target.name
        if(inputName === 'name'){
            if(name.trim().length === 0){
                errors = {...formErrors, name: 'Please enter your name'}
            } else{
                errors = {...formErrors}
                delete errors.name
            }
        }
        else if(inputName === 'mobile'){
            if(mobile.trim().length === 0){
                errors = {...formErrors, mobile: 'Please enter your mobile number'}
            } else if(mobile.trim().length !== 10){
                errors = {...formErrors, mobile: 'Please enter valid mobile number'}
            }
            else{
                errors = {...formErrors}
                delete errors.mobile
            }
        }

        if(inputName === 'email' && email.trim().length !== 0){
            if(!isEmail(email)){
                errors = {...formErrors, email: 'Please enter valid email'}
            }
            else{
                errors = {...formErrors}
                delete errors.email
            }
        }
         
        setFormErrors({...errors})
    }

    //run validations on submit
    const runValidations = () => {
        if(name.trim().length === 0){
            errors.name = 'Please enter your name'
        }
        if(mobile.trim().length === 0){
            errors.mobile = 'Please enter your mobile'
        } else if(mobile.length !== 10){
            errors.mobile = 'Please enter valid mobile number'
        }
        if(email.trim().length > 0){
            if(!isEmail(email)){
                errors.email = 'Please enter valid email'
            }
        }
    }

    //if no errors, call formSubmission() in parent component that dispatches action to add/edit customer 
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
                mobile: mobile,
                email: email
            }
            formSubmission(formData)
        }
    }

    //close modal on cancel
    const handleCancel = (e) => {
        e.preventDefault()
        handleShowModal()
    }

    return (
        <Modal show={showModal } 
               onHide={() => {}}
               size="md" 
               aria-labelledby="contained-modal-title-vcenter" 
               centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title ? title : 'Update Customer'}
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
                            <label >Mobile*:</label><br/>
                        </div>  
                        <div className="col-md-9">
                        <input type="number" className="form-control"
                                name="mobile" 
                                value={mobile} 
                                onChange={handleChange}
                                onBlur={handleError}
                                placeholder="Enter mobile"
                            />
                        { formErrors.mobile && <span className="text-danger"> {formErrors.mobile}<br/> </span> }
                        </div>  
                    </div>

                    <div className="row mb-2">
                        <div className="col-md-3">
                            <label >Email:</label><br/>
                        </div>  
                        <div className="col-md-9">
                        <input type="text" className="form-control"
                                name="email" 
                                value={email} 
                                onChange={handleChange}
                                onBlur={handleError}
                                placeholder="Enter email"
                            />
                        { formErrors.email && <span className="text-danger">{formErrors.email}<br/></span>}
                        </div>  
                    </div>

                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-9">
                            <input type="submit" value={title ? "save" : "update"} className="btn btn-primary btn-sm" style={{marginRight: '5px'}}/>
                            <button onClick={handleCancel }className="btn btn-link btn-sm" style={{textDecoration:'none'}}>
                                Cancel
                            </button>
                        </div>    
                    </div>
                    
                </form>
            </Modal.Body>

        </Modal>
    )
}

export default CustomerForm