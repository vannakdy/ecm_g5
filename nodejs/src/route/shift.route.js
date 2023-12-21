const controller = require("../controller/shift.controller")
const shift = (app) => {
    app.get("/api/shift",controller.getAll);
    app.get("/api/shift/:Id",controller.getOne);
    app.post("/api/shift",controller.create);
    app.put("/api/shift",controller.update);
    app.delete("/api/shift/:Id",controller.remove);
}

module.exports = shift