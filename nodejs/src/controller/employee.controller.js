
const db = require("../util/db")

const getAll = async (req,res) => {
    const listEmployee = await db.query("SELECT * FROM employee");
    const total = await db.query("SELECT COUNT(Id) as Total FROM employee; ")
    res.json({
        list:listEmployee,
        totalRecord:total,
    })

    // const sqlInser = "INSERT INTO ...."
    // var param = ["soke",....]
    // const data = await db.query(sqlInser,param)
    // res.json({
    //     message: "insert success"
    // })
}

const getAll1 = (req,res) => {
    // Way1
    var sql = "SELECT * FROM employee"
    var sqlCustomer = "SELECT * FROM customer"
    // db.query("sql","handler")
    // db.query("sql",["param"],"handler")
    db.query(sql,(error,rows)=>{
        if(!error){
            // SELECT customer 
            db.query(sqlCustomer,(error1,rows1)=>{
                if(!error1){
                    // success all 
                    res.json({
                        list_employee:rows,
                        list_customer:rows1
                    })
                }else{
                    res.json({
                        error:true,
                        message:error1
                    })
                }
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