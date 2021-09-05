import { Route, NavLink, withRouter, Switch } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHome } from '@fortawesome/free-solid-svg-icons'

import '../css/navbar.css' 
import PrivateRoute from './PrivateRoute'
import ProtectedRoute from './ProtectedRoute'
import Home from './Home'
import Register from './User/Register'
import Login from './User/Login' 
import CustomersContainer from './customers/CustomersContainer'
import ProductsContainer from './products/ProductsContainer'
import BillsContainer from './bills/BillsContainer'
import PageNotFound from './PageNotFound'

const NavBar = (props) => {
    const isLoggedIn = localStorage.getItem('token') || false

    const handleLogout = () => {
        localStorage.removeItem('token')
        props.history.push('/')
    }

    return (
        <div className="d-flex flex-row ">
            <div className="sidenav">
                <h1 style={{textAlign: 'center'}}>BMS</h1>
                <ul style={{listStyleType: 'none'}} className= "nav nav-pills">                   

                    {
                        isLoggedIn ? (
                            <>
                            <li>
                                <NavLink  to="/dashboard" activeClassName="active">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to="/customers" activeClassName="active">
                                    Customers
                                </NavLink> 
                            </li>
                            <li>
                                <NavLink  to="/products" activeClassName="active">
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to="/bills" activeClassName="active">
                                    Bills
                                </NavLink>
                            </li>
                            <li onClick={handleLogout} style={{cursor: 'pointer'}}>
                                <a> Logout</a>
                            </li>
                            </>
                        ) : (
                            <>
                            <li>
                                <NavLink exact to="/" activeClassName="active">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to="/register" activeClassName="active">
                                    Register
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to="/login" activeClassName="active">
                                    Login
                                </NavLink>
                            </li>
                            </>
                        )
                    }
                    
                </ul>
                
            </div>
            <Switch>
                <ProtectedRoute path="/" component={Home} isLoggedIn={isLoggedIn} exact={true}/> 
                <ProtectedRoute path="/register" component={Register} isLoggedIn={isLoggedIn} />
                <ProtectedRoute path="/login" component={Login} isLoggedIn={isLoggedIn} />
                <PrivateRoute path="/customers" component={CustomersContainer} isLoggedIn={isLoggedIn}/>
                <PrivateRoute path="/products" component={ProductsContainer} isLoggedIn={isLoggedIn}/>
                <PrivateRoute path="/bills" component={BillsContainer} isLoggedIn={isLoggedIn}/> 
                <Route component={PageNotFound} />
            </Switch>

        </div>
    )

}

export default withRouter(NavBar)