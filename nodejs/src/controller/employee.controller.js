
const db = require("../util/db")

const getAll = (req,res) => {
    var sql = "SELECT * FROM employee"
    // db.query("sql","handler")
    // db.query("sql",["param"],"handler")
    db.query(sql,(error,rows)=>{
        if(!error){
            res.json({
                list:rows
            })
        }else{
            res.json({
                error:true,
                message:error
            })
        }
    })
}

const getOne = (req,res) => {
    const {id} = req.params;
    var sql = "SELECT * FROM employee WHERE Id = ?";
    var param = [id];
    db.query(sql,param,(error,rows)=>{
        if(!error){
            res.json({
                list:rows
            })
        }else{
            res.json({
                error:true,
                message:error
            })
        }
    })
}

const create = (req,res) => {
   const {
        Firstname,Lastname,Gender,Dob,Email,Tel,Address,Role
   } = req.body;
   var sql = "INSERT INTO employee (Firstname,Lastname,Gender,Dob,Email,Tel,Address,Role) VALUES (?,?,?,?,?,?,?,?)"
   var param = [Firstname,Lastname,Gender,Dob,Email,Tel,Address,Role];
   db.query(sql,param,(error,rows)=>{
     if(!error){
        res.json({
            message: (rows.affectedRows != 0 ? "Insert success!" : "Something wrong!"),
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
    const { Id } = req.body;
    var sql = "DELETE FROM employee WHERE Id = ?";
    var param = [Id]
    db.query(sql,param,(error,rows)=>{
        if(!error){
            res.json({
                message:rows.affectedRows != 0 ? "Remove success!" : "Employee not found!",
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

const update = (req,res) => {
  const {
    Firstname,Lastname,Gender,Dob,Email,Tel,Address,Role,Id
  } = req.body;
  var sql = "UPDATE employee SET Firstname=?, Lastname=?, Gender=?, Dob=?, Email=?, Tel=?, Address=?, Role=? WHERE Id=?"
  var param = [Firstname,Lastname,Gender,Dob,Email,Tel,Address,Role,Id]
  db.query(sql,param,(error,rows)=>{
    if(!error){
        res.json({
            message:rows.affectedRows != 0 ? "Update success!" : "Employee not found!",
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
    getOne,
    getAll,
    create,
    remove,
    update
}