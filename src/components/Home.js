
const Home = (props) => {


    return(
        <div className="container mt-3">
            <h3 style={{textAlign: 'center'}}>Welcome to BMS</h3>
            <div className="row mt-3">
                <img src="billing.png" alt="e-invoicing" style={{height: '350px'}} />

            </div>

            <div className="row">
                <div className="col-md-3 card">
                    <h5>User Resource</h5>
                </div>
                <div className="col-md-3 card">
                    <h5>Customers Resource</h5>
                </div>
                <div className="col-md-3 card">
                    <h5>Products Resource</h5>
                </div>
                <div className="col-md-3 card">
                    <h5>Bills Resource</h5>
                </div>
            </div>
        </div>
    )

}

export default Home