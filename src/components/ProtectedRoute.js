import { Route, Redirect } from 'react-router-dom'

const  ProtectedRoute = (props) =>  {
    const {path, component, isLoggedIn, exact} = props

    return (
        <>
        {
            !isLoggedIn ? (
                <Route path={path} component = {component} exact={exact}/>

            ) : (
                <Redirect to="/dashboard" />
            )
        }
        </>
    )

}

export  default  ProtectedRoute;