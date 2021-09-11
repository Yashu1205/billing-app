import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Route, NavLink, withRouter, Switch } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { BsFillHouseDoorFill, BsFileText, BsFileSpreadsheet, BsGraphUp, BsBoxArrowRight } from 'react-icons/bs'
import { FaUserFriends, FaUser } from 'react-icons/fa'
import { MdPowerSettingsNew, MdShoppingBasket } from 'react-icons/md'

import '../styles/navbar.css' 
import PrivateRoute from './PrivateRoute'
import ProtectedRoute from './ProtectedRoute'
import Home from './Home'
import Register from './User/Register'
import Login from './User/Login' 
import PageNotFound from './PageNotFound'
const DashboardContainer = React.lazy(() => import('./dashboard/DashboardContainer'))
const CustomersContainer = React.lazy(() => import('./customers/CustomersContainer'))
const ProductsContainer = React.lazy(() => import('./products/ProductsContainer'))
const BillsContainer = React.lazy(() => import('./bills/BillsContainer'))
const BillDetail = React.lazy(() => import('./bills/BillDetail'))
const UserAccount = React.lazy(() => import('./User/UserAccount'))

const NavBar = (props) => {
    const { userAccount } = useSelector((state) => {
        return state.user
    })
    const isLoggedIn = localStorage.getItem('token') || false

    const override = {
        display: 'block',
        margin: '50px auto',
        borderColor: '#37a37b'
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        props.history.push('/')
    }

    return (
        <div className="d-flex flex-row ">
            <div className="sidenav">
                {isLoggedIn && <h4 style={{textAlign: 'center'}}>{userAccount.businessName}</h4> }
                <ul style={{listStyleType: 'none'}} className= "nav nav-pills">                   
                    
                    {
                        isLoggedIn ? (
                            <>
                            <li>
                                <NavLink  to="/dashboard" activeClassName="active">
                                    <BsGraphUp size="1em" />Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to="/customers" activeClassName="active">
                                <FaUserFriends size="1.2em"/>Customers
                                </NavLink> 
                            </li>
                            <li>
                                <NavLink  to="/products" activeClassName="active">
                                    <MdShoppingBasket size="1.2em"/>Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to="/bills" activeClassName="active">
                                   <BsFileSpreadsheet size="1.3em"/> Bills
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to="/profile" activeClassName="active">
                                    <FaUser size="1em"/>Profile
                                </NavLink>
                            </li>
                            <li onClick={handleLogout} style={{cursor: 'pointer'}} >
                                <NavLink to="" exact activeClassName="active"> 
                                    <MdPowerSettingsNew size="1.2em" />Logout 
                                </NavLink>
                            </li>
                            </>
                        ) : (
                            <>   
                            <li>
                                <NavLink exact to="/" activeClassName="active">
                                    <BsFillHouseDoorFill size="1.3em"/> Home
                                </NavLink>
                            </li>                         
                            <li>
                                <NavLink  to="/register" activeClassName="active">
                                    <BsFileText size="1.3em" />Register
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to="/login" activeClassName="active">
                                    <BsBoxArrowRight />Login
                                </NavLink>
                            </li>
                            </>
                        )
                    }
                    
                </ul>
                
            </div>
            <Suspense fallback={<ClipLoader color="#ffffff" loading={true} css={override} size={100} />} >
                <Switch>
                    <ProtectedRoute path="/" component={Home} isLoggedIn={isLoggedIn} exact={true}/> 
                    <ProtectedRoute path="/register" component={Register} isLoggedIn={isLoggedIn} />
                    <ProtectedRoute path="/login" component={Login} isLoggedIn={isLoggedIn} />
                    
                    <PrivateRoute path="/dashboard" component={DashboardContainer} isLoggedIn={isLoggedIn} />
                    <PrivateRoute path="/profile" component={UserAccount} isLoggedIn={isLoggedIn} />
                    <PrivateRoute path="/customers" component={CustomersContainer} isLoggedIn={isLoggedIn}/>
                    <PrivateRoute path="/products" component={ProductsContainer} isLoggedIn={isLoggedIn}/>
                    <PrivateRoute path="/bills" component={BillsContainer} isLoggedIn={isLoggedIn}/> 
                    <PrivateRoute  path="/bill-detail/:id" component={BillDetail} isLoggedIn={isLoggedIn} exact={true} />
                           
                    <Route component={PageNotFound} />
                </Switch>
            </Suspense>
        </div>
    )

}

export default withRouter(NavBar)