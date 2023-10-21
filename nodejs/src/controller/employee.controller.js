

const getAll = (req,res) => {
    res.json({
        message: "list all employee"
    })
}

const create = (req,res) => {
    res.json({
        message: "Create employee"
    })
}

const remove = (req,res) => {
    res.json({
        message: "Remove employee"
    })
}

const update = (req,res) => {
    res.json({
        message: "Update employee"
    })
}

module.exports = {
    getAll,
    create,
    remove,
    update
}