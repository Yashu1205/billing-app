const Stats = (props) => {
    const { customers, products, bills} = props

    //get total sales of the business
    const totalSales = bills.reduce((total, current) => {
        return total + current.total
    }, 0)
    
    return (
        <>
        <div className="d-flex flex-wrap">
            <div className="card" style={{width:'22%', height:'100px', margin:'8px', backgroundColor: 'rgb(76 182 172)'}}>
                <div className="card-body">
                    <h4 className="card-subtitle" style={{color: 'white'}}>Customers</h4>
                    <h5 className="card-title mb-2 " style={{color: 'white'}}>{customers.length}</h5>
                </div>
            </div>
            <div className="card" style={{width:'22%', height:'100px', margin:'8px', backgroundColor: 'rgb(76 182 172)'}}>
                <div className="card-body">
                    <h4 className="card-subtitle" style={{color: 'white'}}>Products</h4>
                    <h5 className="card-title mb-2 " style={{color: 'white'}} >{products.length}</h5>
                </div>
            </div>
            <div className="card" style={{width:'22%', height:'100px', margin:'8px', backgroundColor: 'rgb(76 182 172)'}}>
                <div className="card-body">
                    <h4 className="card-subtitle" style={{color: 'white'}}>Purchases</h4>
                    <h5 className="card-title mb-2 " style={{color: 'white'}}>{bills.length}</h5>                    
                </div>
            </div>
            <div className="card" style={{width:'22%',  height:'100px',margin:'8px', backgroundColor: 'rgb(76 182 172)'}}>
                <div className="card-body">
                    <h4 className="card-subtitle" style={{color: 'white'}}>Revenue</h4>
                    <h5 className="card-title mb-2 " style={{color: 'white'}}>INR. {totalSales}</h5>
                </div>
            </div>
        </div>
        </>
    )
}

export default Stats