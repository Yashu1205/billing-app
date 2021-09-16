import { Route, Redirect } from 'react-router-dom'

const  PrivateRoute = (props) =>  {
    const { isLoggedIn } = props

    return (
        <>
        {
            isLoggedIn ? (
                <Route {...props} />

            ) : (
                <Redirect to="/login" />
            )
        }
        </>
    )

}

export  default  PrivateRoute;