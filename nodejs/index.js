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
const payment_method = require("./src/route/payment_method.route")
const invoice_status = require("./src/route/invoice_status.route")
const roles = require("./src/route/roles.route")
const product = require("./src/route/product.route")
const shift = require("./src/route/shift.route")
const shift_details = require("./src/route/shift_details.route")
const invoice = require("./src/route/invoice.route")

// call route
employee(app)
customer(app)
category(app)
payment_method(app)
invoice_status(app)
roles(app)
product(app)
shift(app)
shift_details(app)
invoice(app)


// defind port to server
const port = 8081;
app.listen(port,()=>{
    console.log("http:localhost:"+port);
})