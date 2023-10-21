// http 
const express = require("express");
const app = express(); // extend from express 
app.use(express.json()) // req.body ( get params json body )

app.get("/",(req,res)=>{
  res.json({
    message:" Home Sok"
  })
})

// only import
const employee = require("./src/route/employee.route") 
const customer = require("./src/route/customer.route")

// call route
employee(app)
customer(app)


// defind port to server
const port = 8081;
app.listen(port,()=>{
    console.log("http:localhost:"+port);
})