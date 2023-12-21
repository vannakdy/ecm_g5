// block import
import {
  Table,
  Button,
  Stack,
  Carousel
} from "react-bootstrap"
import {Button as ButtonAntd} from "antd"
import {listProduct,PI} from "./data"
import {useState} from "react"
import SaleAndExpendChart from "../../component/chart/dashaboard/SaleAndExpendChart"
import CustomerActiveChart from "../../component/chart/dashaboard/CustomerActiveChart"


const HomePage = () => {
  // React state

  // declare state
  const [name,setName] = useState("SOK")
  const [gender,setGender] = useState("male")
  const [tel,setTel] = useState("096684432")

  const [count,setCount] = useState(100)

  const [course,setCourse] = useState(["C++","C#","Java"])

  var x = 100;

  // name : state name
  // setName : setter of state name
  // useState(10) : allow create state in React 
  // 10 : intailize value to name

 
  // change state
  const onClickMe1 = () => {
    // console.log("You have click me1 button")
    // ... body function when we click buuton "Click Me1"

    // change state 
    // name = "Jon" // error
    // gender = "male" // error
    setName("Jon")
    setGender("male")
    setTel("0999888877")
  }

  const onClickMe2 = () => {
    setName("Channa")
    setGender("Female")
    setTel("09244448888")
  }

  const onDescrease = () => {
    setCount(count - 1)
    x = x - 1
  }

  const onIncrease = () => {
    if(count == 105){
      setCount(10000)
    }else{
      setCount(count + 1)
    }
   
    x = x + 1
  }

  return (
    <div>
      <SaleAndExpendChart />
      <CustomerActiveChart />
    </div>
  )
}

export default HomePage

