
const db = require("../util/db")

const getAll = (req,res) => {
    // db.query("sql statemen","handler")
    db.query(" SELECT * FROM `customer`",(error,rows)=>{
        if(!error){// mean no error
            res.json({
                customer_list: rows
            })
        }else{ // mean some wrong
            res.json({
                error:true,
                message : error
            })
        }
    })
    
}

const create = (req,res) => {
    var {
       firstname,
       lastname,
       gender,
       dob,
       tel,
       email 
    } = req.body
    var sqlInsert = " INSERT INTO customer ( firstname, lastname, gender, dob, tel, email) VALUES ( ?, ?, ?, ?, ?, ?)"
    var sqlParam = [firstname,lastname,gender,dob,tel,email]
    db.query(sqlInsert,sqlParam,(error,rows)=>{
        if(!error){
            res.json({
                message:"Insert successfully!",
                data:rows
            })
        }else{
            res.json({
                error:true,
                message:error
            })
        }
    })
}

const remove = (req,res) => {
    var {id} = req.params
    var sql = "DELETE FROM customer WHERE customer_id = ?"
    db.query(sql,[id],(error,rows)=>{
        if(!error){
            res.json({
                message: (rows.affectedRows != 0 ? "Customer removed!" : "Customer not found!"),
                data:rows
            })
        }else{
            res.json({
                error : true,
                message: error
            })
        }
    })
}

const update = (req,res) => {
    var {
        customer_id,
        firstname,
        lastname,
        gender,
        dob,
        tel,
        email 
     } = req.body
    //  var sqlInsert = " INSERT INTO customer ( firstname, lastname, gender, dob, tel, email) VALUES ( ?, ?, ?, ?, ?, ?)"
    var sqlUpdate = " UPDATE customer SET  firstname=?, lastname=?, gender=?, dob=?, tel=?, email=? WHERE customer_id = ? "
     var sqlParam = [firstname,lastname,gender,dob,tel,email,customer_id]
     db.query(sqlUpdate,sqlParam,(error,rows)=>{
         if(!error){
             res.json({
                 message:"Update successfully!",
                 data:rows
             })
         }else{
             res.json({
                 error:true,
                 message:error
             })
         }
     })
}

module.exports = {
    getAll,
    create,
    remove,
    update
}