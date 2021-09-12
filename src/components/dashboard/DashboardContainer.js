import { useSelector } from 'react-redux'
import Stats from './Stats'
import Bar from './Bar'
import TopStat from './TopStat'

const DashboardContainer = () => {
    
    const { customers } = useSelector((state) => {
        return state.customer
    })

    const { products } = useSelector((state) => {
        return state.product
    })

    const { bills } = useSelector((state) => {
        return state.bill 
    })

    return (
        <div className="container item-container">
            <h3 className="mt-3" style={{marginLeft:'10px'}}>Stats</h3>
            <div className="row">
                <Stats customers={customers} products={products} bills={bills} />
            </div>
            <div className="row">
                <TopStat customers={customers} products={products} bills={bills}/>
            </div>
            <div className="row">
                <Bar customers={customers} products={products} bills={bills} />
            </div>
        </div>
    )
}

export default DashboardContainer