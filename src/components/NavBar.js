import { Route, NavLink, withRouter } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHome } from '@fortawesome/free-solid-svg-icons'

import '../css/navbar.css' 
import Home from './Home'
import Register from './User/Register'
import Login from './User/Login' 
import CustomersContainer from './customers/CustomersContainer'
import ProductsContainer from './products/ProductsContainer'
import BillsContainer from './bills/BillsContainer'

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
                <ul style={{listStyleType: 'none'}}>
                    

                    {
                        isLoggedIn ? (
                            <>
                            <li>
                                <NavLink exact to="/dashboard" activeClassName="active">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/customers" activeClassName="active">
                                    Customers
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/products" activeClassName="active">
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/bills" activeClassName="active">
                                    Bills
                                </NavLink>
                            </li>
                            <li onClick={handleLogout}>
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
                                <NavLink exact to="/register" activeClassName="active">
                                    Register
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/login" activeClassName="active">
                                    Login
                                </NavLink>
                            </li>
                            </>
                        )
                    }
                    
                </ul>
                {/* <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                    <FontAwesomeIcon icon={faHome} /><Link to="/">  Home</Link></a>
                <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Register</a>
                <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Login</a>
                <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Dashboard</a>
                <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Customers</a>
                <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Products</a>
                <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Bills</a> */}
            </div>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/customers" component={CustomersContainer} />
            <Route path="/products" component={ProductsContainer} />
            <Route path="/bills" component={BillsContainer} />

        </div>
    )

}

export default withRouter(NavBar)