
const db = require("../util/db");
const pageSize = 3;
const getAll = async (req,res) => {
    try{
        var {
            txtSearch,
            page// from client 1,2,3
        } = req.query;
        var offset = ((page-1) *  pageSize) // find offet 
        // page = 1 => offset = 0
        // page = 2 => offset = 2
        // page = 3=> offset = 4
        var param = []
        var sqlSelect = "SELECT * FROM product";
        var sqlWhere = "";
        if(txtSearch !=null && txtSearch != ""){
            sqlWhere = " WHERE Name LIKE ?"
            param.push("%"+txtSearch+"%")
        }
        var limit = " LIMIT "+pageSize+" OFFSET "+offset; //2
        var orderBy = " ORDER BY Id DESC"
        var sql = sqlSelect + sqlWhere  +  orderBy + limit;
        const list = await db.query(sql,param)
        var total = 0;
        if(page == 1){
            var sqlCount = "SELECT COUNT (Id) as Total FROM Product" 
            sql = sqlCount + sqlWhere
            var total = await db.query(sql,param)
        }
        res.json({
            list: list,
            total : total
        })
    }catch(err){
        res.status(500).send({
            message : err.message
        })
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
    try{
        const {
            Name, Description, CategoryId, Status, Price
        } = req.body;
        var filename = null;
        if(req.file){
            filename = req.file.filename
        }
        var sqlInsert = "INSERT INTO product ( Name, Image , Description, CategoryId, Status, Price) VALUES (?,?,?,?,?,?) ";
        var param = [  Name,filename, Description, CategoryId, Status, Price];
        const data = await db.query(sqlInsert,param);
        res.json({
            message : "Insert success!",
            data:data
        })
    }catch(error){
        res.status(500).send({
            message : error.message
        })
    }
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