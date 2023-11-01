
import {Outlet} from "react-router-dom"
const LayoutLogin = () => {
    return (
        <div>
            <div style={{height:50,backgroundColor:'darkblue'}}></div>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default LayoutLogin;