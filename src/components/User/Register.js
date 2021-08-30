import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import isEmail from 'validator/lib/isEmail'

import { startUserRegistration } from '../../actions/UserAction'

const UserRegistration  = (props) => {
    const [signupForm, setSignupForm] = useState({username:'', email:'',password:'', businessName:'', address:''})
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const { serverErrors } = useSelector(state => {
        return state.user
    })
    console.log(serverErrors)
    const dispatch = useDispatch()

    const runValidations = () => {
        if(signupForm.username.trim().length === 0){
            errors.username = 'username is required'
        }
        if(signupForm.email.trim().length === 0){
            errors.email = 'email is required'
        } else if(!isEmail(signupForm.email)){
            errors.email = 'invalid email'
        }
        if(signupForm.password.trim().length === 0){
            errors.password = 'password is required'
        }
    }

    const resetForm = () => {
        const userInfo = {username:'', email:'',password:'', businessName:'', address:''}
        setSignupForm({...userInfo})
    }

    const handleCancel = (e) => {
        e.preventDefault()
        resetForm()        
        setFormErrors({})
    }

    const handleChange = (e) => {
        setSignupForm({...signupForm, [e.target.name]:e.target.value })
    }

    const handleSubmit = (e, formData) => {
        e.preventDefault()
        runValidations()

        
        const redirectToLogin = () => {
            props.history.push('/login')
        }

        if(Object.keys(errors).length > 0){
            setFormErrors({...errors})
        }
        else{
            setFormErrors({})
            dispatch(startUserRegistration(signupForm, resetForm, redirectToLogin))
        }
    }

    return (
        <div className="p-2 bd-highlight">
            <h3>Register with us</h3>

            <form onSubmit={handleSubmit}>
                <label>username* :</label>
                <input type="text" name="username" value={signupForm.username} onChange={handleChange} /><br/>
                {formErrors.username && <span className="text-danger">{formErrors.username} <br/></span>}
                {serverErrors.username && <span className="text-danger">username is already taken <br/></span>}
                
                <label>email* :</label>
                <input type="text" name="email" value={signupForm.email} onChange={handleChange} /><br/>
                {formErrors.email && <span className="text-danger">{formErrors.email} <br/></span>}
                {serverErrors.email && <span className="text-danger">email is already taken <br/></span>}

                <label>password* :</label>
                <input type="password" name="password" value={signupForm.password} onChange={handleChange} /><br/>
                {formErrors.password && <span className="text-danger">{formErrors.password} <br/></span>}

                <label>business name* :</label>
                <input type="text" name="businessName" value={signupForm.businessName} onChange={handleChange} /><br/>
                {formErrors.businessName && <span className="text-danger">{formErrors.businessName} <br/></span>}

                <label>address* :</label>
                <input type="text" name="address" value={signupForm.address} onChange={handleChange} /><br/>
                {formErrors.address && <span className="text-danger">{formErrors.address} <br/></span>}

                <input type="submit" value="submit" />
                <input type="button" value="cancel" onClick={handleCancel}/>
            </form>
        </div>
    )
}

export default UserRegistration