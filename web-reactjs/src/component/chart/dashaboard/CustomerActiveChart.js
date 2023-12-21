import { useEffect } from "react";
import {Chart} from "react-google-charts"
import {request} from '../../../share/request'

const CustomerActiveChart = () => {

    useEffect(()=>{
        getList();
    },[])

    const getList = async () => {
        const res = await  request("report/customerActice","get");
    }

    const data = [
        ["Month", "Active"],
        ["01-23", 1000],
        ["02-23", 1170],
        ["03-23", 660],
        ["04-23", 1030],
    ]
    const options = {
        chart: {
          title: "Customer Active",
          subtitle: "Customer Active From 01-23 / 04-23",
        },
     };
    return (
        <div>
            <Chart
                chartType="Line"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </div>
    )
}

export default CustomerActiveChart
