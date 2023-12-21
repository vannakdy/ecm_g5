import { message } from "antd";
import axios from "axios"

const base_url = "http://localhost:8081/api/";

export const request = (url="",method="get",data={}) => {
    var header = {'Content-Type': 'application/json'}
    if(data instanceof FormData){
        header = {'Content-Type': 'multipart/form-data'}
    }
    return axios({
        url: base_url + url,
        method:method,
        data:data,
        headers: header
    }).then(res=>{
       return res.data;
    }).catch(error=>{
       console.log(error)
       var respone = error.response
       if(respone.status == 500){
            var mesage_from_server = respone.data.message;
            message.error(mesage_from_server)
       }
       return false
    }).finally(()=>{
        
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