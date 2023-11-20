// http 
const express = require("express");
const app = express(); // extend from express 
const cors = require("cors")

app.use(express.json()) // req.body ( get params json body )
// need to allow cross origin
app.use(cors({origin:"*"}))

app.get("/",(req,res)=>{
  res.json({
    message:" Home Sok"
  })
})

// only import
const employee = require("./src/route/employee.route") 
const customer = require("./src/route/customer.route")
const category = require("./src/route/category.route")

// call route
employee(app)
customer(app)
category(app)


// defind port to server
const port = 8081;
app.listen(port,()=>{
    console.log("http:localhost:"+port);
})