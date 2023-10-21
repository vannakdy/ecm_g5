// import {} from "./A"
// import {} from "../"
import {list,PI,getProductBarcode, getProductName,getProductById} from "../../share/product"
import product from  "../../share/product"

import {Button, Input} from "antd"

const AboutPage = () => {

    var id = 101
    const item = getProductById(id)
    debugger
    // console.log(typeof(id))
    console.log(item)
    var strProduct = ""
    if(item.length != 0){
        strProduct = item[0].id +" - "+item[0].name
    }else{
        strProduct = "Product id ("+id+") not fount in list!"
    }

    return (
        <div>
            <h4>product : {strProduct} </h4>

        </div>
    )
}
export default AboutPage