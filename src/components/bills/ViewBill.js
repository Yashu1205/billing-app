import { Modal } from 'react-bootstrap'
import html2pdf from 'html2pdf.js'

const ViewBill = (props) => {
    const { billDetails, showBillModal, handleShowBillModal, getCustomerName, getProductName } = props
    const customerName = getCustomerName(billDetails.customer)

    const downloadBill = () => {
        const element = document.getElementById('bill-info')
        const opt = {
            margin:       1,
            filename:     `${customerName}-bill.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 1 },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
          };

        html2pdf().set(opt).from(element).save()
    }

    return (
        <Modal
            show={showBillModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <div className="w-25" style={{right: '0px', position: 'absolute', margin:'5px'}}>
                <button className="btn btn-primary btn-sm" onClick={downloadBill}>Download</button>
            </div>
            <div id="bill-info">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {customerName}  {billDetails.date.slice(0,10)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card">
                        <div className="card-body">
                            <p>{}</p>
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th>S.N.</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        billDetails.lineItems.map((lineItem, index) => {
                                            return (
                                                <tr key={lineItem._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{getProductName(lineItem.product)}</td>
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
                    </div>
                </Modal.Body>
            </div>
            <Modal.Footer>
                <button onClick={handleShowBillModal}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ViewBill 