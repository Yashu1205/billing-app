import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import isEmail from 'validator/lib/isEmail'

const CustomerForm = (props) => {
    const { name: custName, email: custEmail, mobile: custMobile, title, formSubmission, showModal, handleShowModal } = props
    const [name, setName] = useState(custName ? custName : '')
    const [email, setEmail] = useState(custEmail ? custEmail : '')
    const [mobile, setMobile] = useState(custMobile ? custMobile : '')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

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

    const runValidations = () => {
        if(name.trim().length === 0){
            errors.name = 'name is required'
        }
        if(mobile.trim().length === 0){
            errors.mobile = 'mobile is required'
        }
        if(email.trim().length > 0){
            if(!isEmail(email)){
                errors.email = 'email is invalid'
            }
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
                mobile: mobile,
                email: email
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
                                placeholder="Enter email"
                            />
                        { formErrors.email && <span className="text-danger">{formErrors.email}<br/></span>}
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

export default CustomerForm