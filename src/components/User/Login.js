import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeServerErrors, startLoginUser } from "../../actions/UserAction"

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

    const resetForm = () => {
        setEmail('')
        setPassword('')
    }

    const handleCancel = (e) => {
        e.preventDefault()
        resetForm()
        setLoginErrors({})
        dispatch(removeServerErrors())
    } 

    const runValidations = () => {
        if(email.trim().length === 0){
            errors.email = 'Email is required'
        } 
        if(password.trim().length === 0){
            errors.password = 'Password is required'
        }
    }  

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()

        const redirectToHome = () => { props.history.push('/')}

        if(Object.keys(errors).length > 0){
            setLoginErrors(errors)
        }
        else{
            setLoginErrors({})
            const formData = {
                email: email,
                password: password
            }
            dispatch(startLoginUser(formData, resetForm, redirectToHome))
        }
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group row mt-3">
                <label className="col-sm-4 col-form-label">Email*:</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" 
                            name="email"
                            value={email}
                            onChange={handleChange} />

                    {loginErrors.email && <span className="text-danger">{loginErrors.email} <br/></span>}
                </div>
            </div>
            <div className="form-group row mt-3">
                <label className="col-sm-4 col-form-label">Password*:</label>
                <div className="col-sm-8">
                    <input type="password" className="form-control" 
                            name="password"
                            value={password}
                            onChange={handleChange} />

                    {loginErrors.password && <span className="text-danger">{loginErrors.password} <br/></span>}
                    {serverErrors.errors && <span className="text-danger"> { serverErrors.errors} <br/></span>} 
                </div>
            </div>
            <div className="form-group row mt-3">
                <div className="col-sm-4"></div>
                <div className="col-sm-8">
                    <input type="submit" value="login" style={{marginRight: '5px'}} />
                    <input type="button" value="cancel" onClick={handleCancel} />
                </div>
            </div>
            </form>
        </div>
    )
}

export default Login