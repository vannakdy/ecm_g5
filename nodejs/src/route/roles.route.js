
const controller = require("../controller/role.controller")
const role = (app) => {
    app.get("/api/roles",controller.getAll);
    app.get("/api/roles/:Id",controller.getOne);
    app.post("/api/roles",controller.create);
    app.put("/api/roles",controller.update);
    app.delete("/api/roles/:Id",controller.remove);
}

module.exports = role