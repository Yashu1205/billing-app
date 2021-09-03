import { useState } from 'react'
import { Modal } from 'react-bootstrap'

const CustomerForm = (props) => {
    const { name: custName, email: custEmail, mobile: custMobile, formSubmission, showModal, handleModalToggle } = props
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
        handleModalToggle()
    }

    return (
        <Modal show={showModal } size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Customer
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <label >Name</label><br/>
                    <input type="text" className="form-control"
                        name="name" 
                        value={name} 
                        onChange={handleChange}
                        placeholder="Enter name"
                    />
                    { formErrors.name && <span className="text-danger"> {formErrors.name}<br/> </span> }
                    <br/>

                    <label>Mobile</label><br/>
                    <input type="text" className="form-control"
                            name="mobile" 
                            value={mobile}
                            onChange={handleChange}
                            placeholder="Enter mobile" />
                    { formErrors.mobile && <span className="text-danger"> {formErrors.mobile}<br/> </span> }
                    <br/>

                    <input type="text" className="form-control"
                            name="email" 
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter email" />
                    <br/>

                    <input type="submit" value="save" className="btn btn-primary btn-sm" />
                    <button onClick={handleCancel } className="btn btn-secondary btn-sm">Cancel</button>
                </form>
            </Modal.Body>

        </Modal>
        // <div className="card">
        //     <div className="card-body">
        //     <h2>Add Note</h2>

        //         <form onSubmit={handleSubmit}>

        //             <input type="text" className="form-control"
        //                 name="name" 
        //                 value={name} 
        //                 onChange={handleChange}
        //                 placeholder="Enter name"
        //             />
        //             { formErrors.name && <span className="text-danger"> {formErrors.name}<br/> </span> }
        //             <br/>

        //             <input type="text" className="form-control"
        //                     name="mobile" 
        //                     value={mobile}
        //                     onChange={handleChange}
        //                     placeholder="Enter mobile" />
        //             { formErrors.mobile && <span className="text-danger"> {formErrors.mobile}<br/> </span> }
        //             <br/>

        //             <input type="text" className="form-control"
        //                     name="email" 
        //                     value={email}
        //                     onChange={handleChange}
        //                     placeholder="Enter email" />
        //             <br/>

        //             <input type="submit" className="btn btn-primary btn-sm" value="Save" />
                    
        //             <button className="btn btn-secondary btn-sm" style={{marginLeft: '5px'}}
        //                                 onClick={handleCancel}>Cancel</button> 
        //         </form>
        //     </div>
        // </div>
    )
}

export default CustomerForm