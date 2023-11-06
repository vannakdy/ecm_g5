import { useState } from "react"

const LoginPage = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")


    const onLogin = () => {
        // correct password
        const staticUsername = "sa", staticPassword="123456"
        if(username == staticUsername && password == staticPassword){
            localStorage.setItem("isLogin",'1')
            window.location.href="/" // link to other page by routename
        }else{
            alert("Username or password incorrect!")
        }
        
    }

    return (
        <div>
            <h1>LoginPage</h1>
            <input 
                placeholder="username"
                onChange={(event)=>{
                    setUsername(event.target.value)
                }}
            />
            <input 
                placeholder="password"
                onChange={(event)=>{
                    setPassword(event.target.value)
                }}
            />
            <br/>
            <button onClick={onLogin}>Login</button>
            <button>Register</button>
        </div>
    )
}

export default LoginPage;