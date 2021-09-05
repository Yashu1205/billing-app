import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import isEmail from 'validator/lib/isEmail'

import { removeServerErrors, startUserRegistration } from '../../actions/UserAction'

const UserRegistration  = (props) => {
    const [signupForm, setSignupForm] = useState({username:'', email:'',password:'', businessName:'', address:''})
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const { serverErrors } = useSelector(state => {
        return state.user
    })
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
        if(signupForm.businessName.trim().length === 0){
            errors.businessName = 'business name is required'
        }
        if(signupForm.address.trim().length === 0){
            errors.address = 'business address is required'
        }
        
    }

    const resetForm = () => {
        const userInfo = {username:'', email:'',password:'', businessName:'', address:''}
        setSignupForm({...userInfo})
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

    const handleCancel = (e) => {
        e.preventDefault()
        resetForm()        
        setFormErrors({})
        dispatch(removeServerErrors())
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-3">

                </div>
                <div className="col-md-4 card mt-5">
                    <div style={{margin: '10px', padding: '10px'}}> 
                    <h3>Register with us</h3>
                    <form onSubmit={handleSubmit}>
                        <table className="table table-borderless pt-3" >
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text" className="form-control form-control-sm"
                                                name="username" 
                                                value={signupForm.username} 
                                                onChange={handleChange}
                                                placeholder="Enter username" />
                                        {formErrors.username && <span className="text-danger">{formErrors.username} <br/></span>}
                                        {serverErrors.username && <span className="text-danger">username is already taken <br/></span>} 
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <input type="text" className="form-control form-control-sm"
                                                name="email" 
                                                value={signupForm.email} 
                                                onChange={handleChange} 
                                                placeholder="example@email.com" />
                                        {formErrors.email && <span className="text-danger">{formErrors.email} <br/></span>}
                                        {serverErrors.email && <span className="text-danger">email is already taken <br/></span>}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <input type="password" className="form-control form-control-sm"
                                                name="password" 
                                                value={signupForm.password} 
                                                onChange={handleChange} 
                                                placeholder="Enter password" />
                                        { formErrors.password && 
                                            <span className="text-danger">{ formErrors.password }</span> 
                                        } 
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <input type="text" className="form-control form-control-sm"
                                                name="businessName" 
                                                value={signupForm.businessName} 
                                                onChange={handleChange} 
                                                placeholder="Enter your business name"/>
                                            { formErrors.businessName && 
                                                <span className="text-danger">{ formErrors.businessName }</span>
                                            } 
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <input type="text" className="form-control form-control-sm"
                                                name="address" 
                                                value={signupForm.address} 
                                                onChange={handleChange} 
                                                placeholder="Enter address for business" />
                                        { formErrors.address && 
                                            <span className="text-danger">{ formErrors.address }</span>
                                        }  
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Already registerd? <NavLink to="/login">Login</NavLink></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="submit" value="submit" className="btn btn-primary btn-sm" style={{marginRight: '10px'}}/>
                                        <input type="button" value="cancel" onClick={handleCancel} className="btn btn-secondary btn-sm" />
                                    </td> 
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserRegistration