import { useSelector } from 'react-redux'
const UserAccount = (props) => {
    const { userAccount } = useSelector(state => {
        return state.user
    })

    return (
        <div className="container mt-3 item-container">
        <div className="row">
            <div className="card mt-5" style={{width:"50%"}}>
                <div style={{margin: '10px', padding: '10px'}}> 
                <h3  style={{textAlign: 'center'}}>My Profile</h3>
                <table className="table table-borderless table-striped">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Username: </td>
                            <td>{userAccount.username}</td>
                        </tr>
                        <tr>
                            <td>Email: </td>
                            <td>{userAccount.email}</td>
                        </tr>
                        <tr>
                            <td>Business Name : </td>
                            <td>{userAccount.businessName}</td>
                        </tr>
                        <tr>
                            <td>Address : </td>
                            <td>{userAccount.address}</td>
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