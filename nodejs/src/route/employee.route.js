
const emplyeeController = require("../controller/employee.controller")
const {upload} = require("../util/helper")
const employee = (app) => {
    app.get("/api/employee",emplyeeController.getAll)
    app.get("/api/employee/:id",emplyeeController.getOne)
    app.post("/api/employee",upload.single("image_emp"),emplyeeController.create)
    app.post("/api/employee/set-password",emplyeeController.setPassword)
    app.post("/api/employee/login",emplyeeController.login)
    app.delete("/api/employee",emplyeeController.remove)
    app.put("/api/employee",upload.single("image_emp"),emplyeeController.update)
}
module.exports = employee