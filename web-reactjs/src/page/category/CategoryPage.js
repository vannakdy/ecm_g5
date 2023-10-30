
import axios from "axios"
import {useEffect, useState} from "react"

const CategryPage = () => {

    const [list,setList] = useState([])

    useEffect(()=>{
        // block form load
        getList();
    },[]);

    const getList = () => { // create function success
        axios({
            url:"http://localhost:8081/api/category",
            method:"get",
            data:{}
        }).then(res=>{
            var listCategory = res.data.list;
            var totalCategory = res.data.total;
            setList(listCategory); // set data to list state
        }).catch(error=>{
            console.log("this is error block")
            console.log(error)
        }).finally(()=>{
            console.log("call finally")
        })
    }

    // create a function to get data category api
    const funtionGetDataFromApi = () => { // arrow function
        // body function 
        axios({
            url:"", // url of api (localhost:8081/api/cagetory,localhost:8081/api/customer)
            method:"", // get,post,put,delete http method
            data:{} // can we want past parameter api
        }).then(res=>{
            // block respones succes from api
        }).catch(error=>{
            // block api respone api
        }).finally(()=>{
            // block always call 
        })
    }


    return (
        <div>
            <h1>CategryPage</h1>
            {/* list category */}
            {/* {list.map((item,index)=>(
                <div key={index} style={{padding:10,borderBottom:"1px solid"}}>
                    <div>{index + 1}. {item.Name}</div>
                    <div>{item.Description}</div>
                </div>
            ))} */}
            {/* list like table */}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item,index)=>(
                        <tr key={index}>
                            <td>{index+1}. {item.Name}</td>
                            <td>{item.Description}</td>
                            <td>{item.Status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CategryPage;