
const Home = (props) => {

    return(
        <div className="container mt-3 " style={{marginLeft: '16%'}}>
            <h3 style={{textAlign: 'center'}}>Welcome to Billing App</h3>
            <div className="row mt-3">
                <img src="billing.png" alt="e-invoicing" style={{height: '350px'}} />

            </div>

            <div className="flex-container d-flex">
            <   div className="card" style={{margin:'20px',width:'50%', textAlign:'center'}}>
                    <div className="card-body">
                        <h5 className="card-title">User </h5>
                        <p>
                            You can register using your own credentials or for testing purpose you can use the below provided login credentials.
                            <br/> 
                        </p>
                        <p><strong>Email:</strong> admin321@gmail.com</p>
                        <p><strong>Password: </strong>test1234</p>
                    </div>
                </div>
                <div className="card" style={{margin:'20px',width:'50%', textAlign:'center'}}>
                    <div className="card-body">
                        <h5 className="card-title">Customers </h5>
                        <p>Once you logged in, you can add customer entering the required details. You can edit customer details as well as you can delete the customer. You can use the added customer while creating bills.</p>
                        <p>You can also search for customers and sorting is also available based on name , email or phone number.</p>
                    </div>
                </div>
                <div className="card" style={{margin:'20px',width:'50%', textAlign:'center'}}>
                    <div className="card-body">
                        <h5 className="card-title">Products </h5>
                        <p>After successfull login, you can add products details by entering the name and price. You can edit product details as well as you can delete the products. You can use the added products for creating bills.</p>
                        <p>Products can also be searched with name and products can also be sorted based on name and price.</p>
                    </div>
                </div>
                <div className="card" style={{margin:'20px',width:'50%', textAlign:'center'}}>
                    <div className="card-body">
                        <h5 className="card-title">Bills </h5>
                        <p>After adding products and customers, you can create bills for a particular customer by adding multiple products. You can view bills details as well as you can delete the bills.</p>
                        <p>Bills can also be searched with customer name bills can also be sorted based on customer name and bills date.</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home