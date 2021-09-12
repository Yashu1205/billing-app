import { Chart } from 'react-google-charts'
import moment from 'moment'
import lastWeekDays from '../../helpers/lastWeekDays'

const Bar = (props) => {
    const { bills } = props
    const currentMonth = moment().month() 
    const lastWeek = lastWeekDays()
    
    const monthlySales = {}
    for(let i = currentMonth; i > currentMonth - 6; i--){
        let currentMonthSales = 0
        bills.forEach(bill => {
            if(moment(bill.date).month() === i){
                currentMonthSales += bill.total
            }
        })
        monthlySales[moment(i+1,'M').format('MMM')] = currentMonthSales
    }
    const salesData = Object.entries(monthlySales).reverse()
    salesData.unshift(['Month','Sales'])

    const weeklySales = {}
    for(let i = 0; i < lastWeek.length; i++){
        let currentWeekSales = 0
        bills.forEach(bill => {
            if(lastWeek[i] === moment(bill.date).format('l')){
                currentWeekSales += bill.total 
            }
        })
        weeklySales[moment(lastWeek[i]).format('ddd')] = currentWeekSales
    }
    const weeklySalesData = Object.entries(weeklySales).reverse()
    weeklySalesData.unshift(['Day','Sales'])

    return(
        <>
            <div className="col-md-6">
                <Chart
                width={500}
                height={300}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={weeklySalesData}
                options={{
                    title: 'Sales in the last week',
                    chartArea: { width: '65%' },
                    hAxis: { title: 'Month'  },
                    vAxis: { title: 'Total Sales', minValue: 0    },
                }}
                legendToggle
            />
            </div>
            <div className="col-md-6">
            <Chart
                width={500}
                height={'300px'}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={salesData}
                options={{
                title: 'Sales in the last six months',
                hAxis: { title: 'Month', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Total Sales',minValue: 0 },
                chartArea: { width: '65%', height: '70%' },
                }}
            />
            </div>
        </>
    )
}

export default Bar 