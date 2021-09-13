const Stats = (props) => {
    const { customers, products, bills} = props

    //get total sales of the business
    const totalSales = bills.reduce((total, current) => {
        return total + current.total
    }, 0)
    
    return (
        <>
        <div className="d-flex flex-wrap">
            <div className="card" style={{width:'22%', height:'100px', margin:'8px'}}>
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">Customers</h6>
                    <h5 className="card-title mb-2 ">{customers.length}</h5>
                </div>
            </div>
            <div className="card" style={{width:'22%', height:'100px', margin:'8px'}}>
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">Products</h6>
                    <h5 className="card-title mb-2 ">{products.length}</h5>
                </div>
            </div>
            <div className="card" style={{width:'22%', height:'100px', margin:'8px'}}>
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">Purchases</h6>
                    <h5 className="card-title mb-2 ">{bills.length}</h5>                    
                </div>
            </div>
            <div className="card" style={{width:'22%',  height:'100px',margin:'8px'}}>
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">Revenue</h6>
                    <h5 className="card-title mb-2 ">INR. {totalSales}</h5>
                </div>
            </div>
        </div>
        </>
    )
}

export default Stats