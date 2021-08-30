import { Route, NavLink, Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

import '../css/navbar.css' 
import Home from './Home'
import Register from './User/Register'
import Login from './User/UserLogin' 

const NavBar = (props) => {


    return (
        <div className="d-flex flex-row">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{width: '150px', borderRight: '1px solid grey'}}>
                <h1>BMS</h1>
                <ul style={{listStyleType: 'none'}}>
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
            {/* <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
            </div> */}
            <Route path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />

        </div>
    )

}

export default withRouter(NavBar)