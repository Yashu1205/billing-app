import { useState } from 'react'

const CustomerForm = (props) => {
    const { name: custName, email: custEmail, mobile: custMobile, formSubmission, title, handleFormToggle } = props
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
        handleFormToggle()
    }

    return (
        <div className="card">
            <div className="card-body">
            <h3>{title ? title : 'Add New Customer'}</h3>

                <form onSubmit={handleSubmit}>

                    <input type="text" className="form-control"
                        name="name" 
                        value={name} 
                        onChange={handleChange}
                        placeholder="Enter name"
                    />
                    { formErrors.name && <span className="text-danger"> {formErrors.name}<br/> </span> }
                    <br/>

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

                    <input type="submit" className="btn btn-primary btn-sm" value={title ? 'Update' : 'Save'} />
                    
                    <button className="btn btn-secondary btn-sm" style={{marginLeft: '5px'}}
                                        onClick={handleCancel}>Cancel</button> 
                </form>
            </div>
        </div>
        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <label>name*: </label>
        //         <input type="text" name="name" value={name} onChange={handleChange} /><br/><br/>
        //         { formErrors.name && <span className="text-danger">{ formErrors.name}<br/></span>}
                
        //         <label>mobile*: </label>
        //         <input type="text" name="mobile" value={mobile} onChange={handleChange} /><br/><br/>
        //         { formErrors.mobile && <span className="text-danger">{ formErrors.mobile}<br/></span>}

        //         <label>email: </label>
        //         <input type="text" name="email" value={email} onChange={handleChange} /><br/><br/>

        //         <input type="submit" value="Add"/>
        //         <input type="button" value="Cancel" onClick={handleCancel} />

        //     </form>
        // </div>
    )
}

export default CustomerForm