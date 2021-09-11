import { Chart } from 'react-google-charts'
import moment from 'moment'

const Bar = (props) => {
    const { bills } = props
    const currentMonth = moment().month() + 1
    
    const monthlySales = {}
    for(let i = currentMonth; i > currentMonth - 6; i--){
        let currentMonthSales = 0
        bills.forEach(bill => {
            if(moment(bill.date).month()+1 === i){
                currentMonthSales += bill.total
            }
        })
        monthlySales[moment(i,'M').format('MMMM')] = currentMonthSales
    }
    const chartData = Object.entries(monthlySales)
    chartData.unshift(['Month','Sales'])
    console.log(monthlySales)

    return(
        <Chart
        width={500}
        height={300}
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
            title: 'Sales in the last six months',
            chartArea: { width: '65%' },
            hAxis: {
                title: 'Total Sales',
                minValue: 0,
            },
            vAxis: {
                title: 'Month',
            },
        }}
        legendToggle
      />
    )
}

export default Bar 