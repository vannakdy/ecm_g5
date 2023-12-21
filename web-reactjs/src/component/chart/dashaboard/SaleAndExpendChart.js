import {Chart} from "react-google-charts"

const SaleAndExpendChart = () => {

    const data = [
        ["Month", "Sales", "Expenses", "Profit"],
        ["01-23", 1000, 900, 100],
        ["02-23", 1170, 460, 250],
        ["03-23", 660, 1120, 300],
        ["43-23", 1030, 540, 350],
    ]
    const options = {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
     };
    return (
        <div>
            <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </div>
    )
}

export default SaleAndExpendChart
