import { Route, Redirect } from 'react-router-dom'

const  PrivateRoute = (props) =>  {
    const {path, component, isLoggedIn, exact} = props

    return (
        <>
        {
            isLoggedIn ? (
                <Route path={path} exact={exact} component = {component} />

            ) : (
                <Redirect to="/login" />
            )
        }
        </>
    )

}

export  default  PrivateRoute;