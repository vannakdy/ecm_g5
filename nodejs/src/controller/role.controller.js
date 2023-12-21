
const db = require("../util/db");

const getAll = async (req,res) => {
    try{
        var sqlSelect = "SELECT * FROM role";
        const list = await db.query(sqlSelect)
        res.json({
            list: list
        })
    }catch(err){
        res.status(500).send({
          message: err,
        });
    }
}

const getOne = async (req,res) => {
    const {Id} = req.params; 
    var sqlSelect = "SELECT * FROM category WHERE Id = ?";
    var param = [Id]
    const list = await db.query(sqlSelect,param)
    res.json({
        list:list
    })
}
const create = async (req,res) => {
    
    const {
        Name, Description, Parent, Status
    } = req.body;

    // var Name = req.body.Name;
    var sqlInsert = "INSERT INTO category (Name, Description, Parent, Status) VALUES (?,?,?,?) ";
    var param = [ Name, Description, Parent, Status];
    const data = await db.query(sqlInsert,param);
    res.json({
        message : "Insert success!",
        data:data
    })
}
const update = async (req,res) => {
    const {
        Name, Description, Parent, Status, Id
    } = req.body;
    var sqlUpdate = "UPDATE category SET Name = ?, Description=?, Parent=?, Status=? WHERE Id = ?";
    var param = [ Name, Description, Parent, Status,Id];
    const data = await db.query(sqlUpdate,param);
    res.json({
        message : "Update success!",
        data:data
    })
}

const remove = async (req,res) => {
    const {Id} = req.params;
    var sqlDelete = "DELETE FROM category WHERE Id = ?";
    var param = [Id];
    const data = await db.query(sqlDelete,param);
    res.json({
        message : data.affectedRows != 0 ? "Remove sucess!" : "Not found!"
    })
}

module.exports = {getAll, getOne, create, update, remove}