
const db = require("../util/db")
const bcrypt = require("bcrypt")
const {removeFile} = require("../util/helper")

const getAll = async (req,res) => {
    // req.query, req.params, req.body
    const {textSearch} = req.query;
    var sqlSelect = "SELECT * FROM employee ";
    // SELECT * FROM employee LIMIT 3 OFFSET 1;
    if(textSearch != null && textSearch != ""){
        sqlSelect += " WHERE Firstname LIKE '%"+textSearch+"%' OR Lastname LIKE '%"+textSearch+"%' OR Tel LIKE '%"+textSearch+"%' "
    }

    sqlSelect += " ORDER BY Id DESC"
    
    const listEmployee = await db.query(sqlSelect);
    const total = await db.query("SELECT COUNT(Id) as Total FROM employee; ")
    
    res.json({
        list:listEmployee,
        total:total,
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
   var filename = null
   if(req.file){
    filename = req.file.filename
   }
   var sql = "INSERT INTO employee (Firstname,Lastname,Gender,Dob,Image,Email,Tel,Address,Role) VALUES (?,?,?,?,?,?,?,?,?)"
   var param = [Firstname,Lastname,Gender,Dob,filename,Email,Tel,Address,Role];
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

const setPassword = async (req,res) => {
    // update column password
    const {
        Tel,
        Password,
        ConfirmPassword
    } = req.body;
    //validate param require 
    var message = {}; // empty object
    if(Tel == null || Tel == ""){
        message.Tel = "Tel requred!"
    }
    if(Password == null || Password == ""){
        message.Password = "Password requred!"
    }else{
        if(Password != ConfirmPassword){
            message.Password = "Password not match!"
        }
    }
    if(Object.keys(message).length > 0){
        res.json({
            message : message
        })
        return false
    }

    const user = await checkIsExistUser(Tel);
    if(!user){
        res.json({
            message : "User does not exist!",
        })
    }else{
        // bcrypt : hash password (123434=>sdfajo94u5o34up03452809453)
        const hashPassword = await bcrypt.hashSync(Password,10)
        var sql = "UPDATE employee SET Password = ? WHERE Tel= ?";
        const data = await db.query(sql,[hashPassword,Tel]);
        delete user.Password
        res.json({
            message : data.affectedRows ? "Passsword set success!" : "Something wrong!",
            profile : user
        }) 
    }
}

const checkIsExistUser = async (Tel) => {
    const user = await db.query("SELECT * FROM employee WHERE Tel = ?",[Tel])
    if(user){
        return user[0]
    }else{
        return null
    }
}

const login = async (req,res) => {
    const {
        Tel,Password
    } = req.body;
    var message = {}; // empty object
    if(Tel == null || Tel == ""){
        message.Tel = "Please input username!"
    }
    if(Password == null || Password == ""){
        message.Password = "Please input password!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            message : message
        })
        return false
    }
    const user = await checkIsExistUser(Tel);
    if(!user){
        res.json({
            message : "User or password incorrect password!",
        })
    }else{
        // verify password (password_front_client, password_in_db)
        const isCorrectPassword = await bcrypt.compareSync(Password,user.Password)
        delete user.Password
        res.json({
            isSuccess : isCorrectPassword ? true : false,
            message : isCorrectPassword ?  "Login success!" : "User or password incorrect password!",
            profile : isCorrectPassword ? user : null
        })
    }
}

const remove = (req,res) => {
    const { Id,Image } = req.body;
    var sql = "DELETE FROM employee WHERE Id = ?";
    var param = [Id];
    db.query(sql,param,(error,rows)=>{
        if(!error){
            if(rows.affectedRows != 0){
                removeFile(Image)
            }
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
    Firstname,Lastname,Gender,Dob,Email,Tel,Address,Role,Id,Image,is_remove_file
  } = req.body;
  var filename = null
  if(req.file){
    filename = req.file.filename
  }else{
    filename = Image
  }

  db.query("SELECT * FROM employee WHERE Id = ?",[Id],(error1,row1)=>{
    if(!error1){
        var sql = "UPDATE employee SET Firstname=?, Lastname=?, Gender=?, Dob=?, Image=?, Email=?, Tel=?, Address=?, Role=? WHERE Id=?"
        var param = [Firstname,Lastname,Gender,Dob,filename,Email,Tel,Address,Role,Id]
        db.query(sql,param,(error,rows)=>{
            if(!error){
                if(rows.affectedRows !=0 ){
                    if(req.file || (Image == null)){
                        if(row1[0].Image != null && row1[0].Image != ""){
                            removeFile(row1[0].Image)  // remove image in server that updated
                        }
                    }
                    
                }
                res.json({
                    message:rows.affectedRows != 0 ? "Update success!" : "Employee not found!",
                    data:rows,
                    is_remove_file:is_remove_file
                })
            }else{
                res.json({
                    error:true,
                    message:error
                })
            }
        })
    }
  })
}

module.exports = {
    getOne,
    getAll,
    create,
    remove,
    update,
    setPassword,
    login
}