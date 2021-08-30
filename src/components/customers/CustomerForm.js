import { useState } from 'react'

const CustomerForm = (props) => {
    const { name: custName, email: custEmail, mobile: custMobile, formSubmission } = props
    const [name, setName] = useState('' || custName)
    const [email, setEmail] = useState('' || custEmail)
    const [mobile, setMobile] = useState('' || custMobile)

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

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: name,
            mobile: mobile,
            email: email
        }
        formSubmission(formData)
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>name*: </label>
                <input type="text" name="name" value={name} onChange={handleChange} /><br/><br/>

                <label>mobile*: </label>
                <input type="text" name="mobile" value={mobile} onChange={handleChange} /><br/><br/>

                <label>email: </label>
                <input type="text" name="email" value={email} onChange={handleChange} /><br/><br/>

                <input type="submit" value="Add"/>

            </form>
        </div>
    )
}

export default CustomerForm