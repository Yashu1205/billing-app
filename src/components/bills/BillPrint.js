import moment from 'moment'
import { getProductName } from '../../helpers/getName'

const BillPrint = (props) => {
    const { userAccount, products, billDetails, customerInfo } = props
    
    return (
            <div id="bill-info" className="card" style={{margin:'50px 20px 0 20px', backgroundColor:'rgb(217 217 12 / 41%)'}}>
                <div className="card-body " style={{textAlign:'center'}}>
                    <h5 className="card-title">{userAccount.businessName}</h5>
                    <h6>Address: {userAccount.address}</h6>
                    <h6>Email:  {userAccount.email}</h6>
                </div>
                <hr/>
                <div className="d-flex justify-content-between" >
                    <div style={{padding:'0 10px'}}>
                        <p>Customer name: {customerInfo.name}</p>
                        <p>Mobile: {customerInfo.mobile}</p>
                    </div>
                    <div style={{padding:'0 10px'}}>
                        <p>Date: {moment(billDetails.date).format('ll')}</p>
                    </div>
                </div>
                <hr/>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th>Particulars</th>
                            <th>MRP</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            billDetails.lineItems.map((lineItem, index) => {
                                return (
                                    <tr key={lineItem._id}>
                                        <td>{index + 1}</td>
                                        <td>{getProductName(products,lineItem.product).name}</td>
                                        <td>{lineItem.price}</td>
                                        <td>{lineItem.quantity}</td>
                                        <td>{lineItem.subTotal}</td>  
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total</td>
                            <td>{billDetails.total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    )

}

export default BillPrint