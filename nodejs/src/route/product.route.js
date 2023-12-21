const controller = require("../controller/product.controller")
const {upload} = require("../util/helper")
const product = (app) => {
    app.get("/api/product",controller.getAll);
    app.get("/api/product/:Id",controller.getOne);
    app.post("/api/product",upload.single("image_product"),controller.create);
    app.put("/api/product",controller.update);
    app.delete("/api/product/:Id",controller.remove);
}

module.exports = product