import { useState } from 'react'

const CustomerForm = (props) => {
    const { name: custName, email: custEmail, mobile: custMobile, formSubmission, handleFormToggle } = props
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
        <div>
            <form onSubmit={handleSubmit}>
                <label>name*: </label>
                <input type="text" name="name" value={name} onChange={handleChange} /><br/><br/>
                { formErrors.name && <span className="text-danger">{ formErrors.name}<br/></span>}
                
                <label>mobile*: </label>
                <input type="text" name="mobile" value={mobile} onChange={handleChange} /><br/><br/>
                { formErrors.mobile && <span className="text-danger">{ formErrors.mobile}<br/></span>}

                <label>email: </label>
                <input type="text" name="email" value={email} onChange={handleChange} /><br/><br/>

                <input type="submit" value="Add"/>
                <input type="button" value="Cancel" onClick={handleCancel} />

            </form>
        </div>
    )
}

export default CustomerForm