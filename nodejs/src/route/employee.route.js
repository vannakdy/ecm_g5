
const emplyeeController = require("../controller/employee.controller")
const employee = (app) => {
    app.get("/api/employee",emplyeeController.getAll)
    app.post("/api/employee",emplyeeController.create)
    app.delete("/api/employee",emplyeeController.remove)
    app.put("/api/employee",emplyeeController.update)
}
module.exports = employee