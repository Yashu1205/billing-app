import { useSelector } from "react-redux"


const UserAccount = (props) => {
    const userAccount = useSelector(state => {
        return state.userAccount
    })

    console.log('in user details component', userAccount)

    return (
        <div className="container mt-3 item-container">
        <div className="row">
            <div className="col-md-3">

            </div>
            <div className="col-md-4 card mt-5">
                <div style={{margin: '10px', padding: '10px'}}> 
                <h3  style={{textAlign: 'center'}}>My Profile</h3>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Username: </td>
                            <td>yashoda </td>
                            {/* <td>{userAccount.username}</td> */}
                        </tr>
                        <tr>
                            <td>Email: </td>
                            {/* <td>{userAccount.email}</td> */}
                        </tr>
                        <tr>
                            <td>Business Name : </td>
                            {/* <td>{userAccount.businessName}</td> */}
                        </tr>
                        <tr>
                            <td>Address : </td>
                            {/* <td>{userAccount.address}</td> */}
                        </tr>
                    </tbody>
                </table>
                
                </div>
            </div>
        </div>
    </div>
    )
} 

export default UserAccount 