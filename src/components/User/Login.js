import { useState } from "react"
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { removeServerErrors, startLoginUser } from "../../actions/userAction"

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginErrors, setLoginErrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()
    const { serverErrors } = useSelector((state) => {
            return state.user
    })    

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        } else{
            setPassword(e.target.value)
        }
    }

    const handleError = (e) => {
        if(e.target.value.trim().length === 0){
            setLoginErrors({...loginErrors, [e.target.name]: `${e.target.name} is required`})
        } else{
            const removeErrors = {...loginErrors}
            delete removeErrors[e.target.name]
            setLoginErrors(removeErrors)
        }  
    }
    const resetForm = () => {
        setEmail('')
        setPassword('')
    }    

    const runValidations = () => {
        if(email.trim().length === 0){
            errors.email = 'email is required'
        } 
        if(password.trim().length === 0){
            errors.password = 'password is required'
        }
    }  

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()

        if(Object.keys(errors).length > 0){
            setLoginErrors(errors)
        }
        else{
            setLoginErrors({})
            const formData = {
                email: email,
                password: password
            }
            dispatch(startLoginUser(formData, resetForm, props.history))
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        resetForm()
        setLoginErrors({})
        dispatch(removeServerErrors())
    } 

    return (
        <div className="container mt-3 item-container">
            <div className="row">
                <div className="col-md-3">

                </div>
                <div className="col-md-4 card mt-5">
                    <div style={{margin: '10px', padding: '10px'}}> 
                    <h3 style={{textAlign: 'center'}}>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <table className="table table-borderless pt-3" >
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>
                                    <input type="text" className="form-control" 
                                            name="email"
                                            value={email}
                                            onChange={handleChange} 
                                            onBlur={handleError}
                                            placeholder="Enter your email" />

                                    {loginErrors.email && <span className="text-danger">{loginErrors.email} <br/></span>}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <input type="password" className="form-control form-control-sm"
                                                name="password" 
                                                value={password} 
                                                onChange={handleChange} 
                                                onBlur={handleError}
                                                placeholder="example@email.com" />
                                        {loginErrors.password && <span className="text-danger">{loginErrors.password} <br/></span>}
                                        {serverErrors.errors && <span className="text-danger">{serverErrors.errors} <br/></span>}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p>New to BMS? <NavLink to="/register">Register here</NavLink></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="submit" value="login" className="btn btn-primary btn-sm" style={{marginRight: '10px'}}/>
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

export default Login