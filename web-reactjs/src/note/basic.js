// block import
import {
    Table,
    Button,
    Stack,
    Carousel
  } from "react-bootstrap"
  import {Button as ButtonAntd} from "antd"
  import {listProduct,PI} from "./data"
  
  
  const HomePage = () => {
    // variable, function, ...
    // var let const
    var x = 10.343;
    var y = 20;
    var name = "Sok";
    var isActive = false;
    var arrPrice = [10,20,40,2,100,300,500]
    var arrName = ["Sok","Som","So"]
    var arrName1 = [[1,2,43,["Som","So"]],100,30,"200"]
    var objPerson = {
      id : 1,
      name : "Dara",
      gender : "Male",
      children : ["Bora","Jon"]
      // ....
    }
  
    // condition
    // if, if else, if else if
    var a = 10;
    var b = "";
    // if(a > 100){
    //   b = "A greather than 100"
    // }
  
  
    // if(a > 100){
    //   b = "A greather than 100"
    // }else{
    //   b = "A less than 100"
    // }
  
    var avg = 49.9;
    var grade = "";
    if( avg >= 90 && avg <= 100){
      grade = "A"
    }else if(avg >= 80 && avg < 90){
      grade = "B"
    }else if(avg >= 70 && avg < 80){
      grade = "C"
    }else if(avg >= 60 && avg < 70){
      grade = "D"
    }else if(avg >= 50 && avg < 60){
      grade = "E"
    }else{
      grade = "F"
    }
  
    // function 
    // loop 
  
  
    // number, string, float, boolean, object
  
    return (
      <div>
        <h1>PI : {PI}</h1>
        <h1>{listProduct[0]}</h1>
        <h1>Average = {avg} , Grade = {grade}</h1>
        <h1>B = {b}</h1>
  
        <h2>{objPerson.children[0] +" "+objPerson.children[0]}</h2>
        <h2>{arrName1[0][2]}</h2>
  
        <h2>{objPerson.id}-{objPerson.name}-{objPerson.gender}</h2>
        <h2>{objPerson.id+" "+objPerson.name+" "+objPerson.gender}</h2>
    
        <h1>{arrPrice[0]}-{arrPrice[5]}</h1>
        <h1>{arrPrice.length}</h1>
        <h1>{arrPrice[arrPrice.length-1]}</h1>
  
        <h1>{x}</h1>
        <div>{y}</div>
        <div>{name}</div>
        <div>{isActive+""}</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>Sok</td>
              <td>Make</td>
              <td style={{ width: 200, textAlign: "center" }}>
                <ButtonAntd>Hello</ButtonAntd>
                <Button size="sm" variant="outline-primary">Edit</Button>
                <Button size="sm" variant="outline-danger">Delete</Button>
              </td>
            </tr>
            <tr>
              <td>101</td>
              <td>Sok</td>
              <td>Make</td>
              <td style={{ width: 200, textAlign: "center" }}>
  
                <Button size="sm" variant="outline-primary">Edit</Button>
                <Button size="sm" variant="outline-danger">Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
  
  export default HomePage
  
  