const Stats = (props) => {
    const { customers, products, bills} = props

    const totalSales = bills.reduce((total, current) => {
        return total + current.total
    }, 0)
    
    return (
        <>
        <div className="d-flex flex-wrap">
            <div className="card" style={{width:'45%', height:'100px', margin:'10px'}}>
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">Customers</h6>
                    <h5 className="card-title mb-2 ">{customers.length}</h5>
                </div>
            </div>
            <div className="card" style={{width:'45%', height:'100px', margin:'10px'}}>
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">Products</h6>
                    <h5 className="card-title mb-2 ">{products.length}</h5>
                </div>
            </div>
            <div className="card" style={{width:'45%', height:'100px', margin:'10px'}}>
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">Purchases</h6>
                    <h5 className="card-title mb-2 ">{bills.length}</h5>                    
                </div>
            </div>
            <div className="card" style={{width:'45%',  height:'100px',margin:'10px'}}>
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">Revenue</h6>
                    <h5 className="card-title mb-2 ">INR. {totalSales}</h5>
                </div>
            </div>
        </div>
        {/* <div className="row">
            <div className="col-md-6 card">
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">Customers</h6>
                    <h5 className="card-title mb-2 ">{customers.length}</h5>
                    <p className="card-text">Show Percentage growth since last week.</p>                    
                </div>
            </div>
            <div className="col-md-6 card">
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">Products</h6>
                    <h5 className="card-title mb-2 ">{products.length}</h5>
                    <p className="card-text">Show Percentage growth since last week.</p>                    
                </div>
            </div>
            </div>
            <div className="row">
                <div className="col-md-6 card">
                    <div className="card-body">
                        <h6 className="card-subtitle text-muted">Purchases</h6>
                        <h5 className="card-title mb-2 ">{bills.length}</h5>
                        <p className="card-text">Show Percentage growth since last week.</p>                    
                    </div>
                </div>
                <div className="col-md-6 card">
                    <div className="card-body">
                        <h6 className="card-subtitle text-muted">Revenue</h6>
                        <h5 className="card-title mb-2 ">{totalSales}</h5>
                        <p className="card-text">Show Percentage growth since last week.</p>                    
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Stats