import { Route, Redirect } from 'react-router-dom'

const  ProtectedRoute = (props) =>  {
    const { isLoggedIn } = props

    return (
        <>
        {
            !isLoggedIn ? (
                <Route {...props}/>

            ) : (
                <Redirect to="/dashboard" />
            )
        }
        </>
    )

}

export  default  ProtectedRoute;