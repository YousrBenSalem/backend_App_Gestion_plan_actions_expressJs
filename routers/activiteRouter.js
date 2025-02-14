const activiteController = require ("../controller/activiteController")
const route = require ("express").Router()
const authentificationToken = require("../middleWare/authenticateToken")



route.post("/add",authentificationToken ,activiteController.createActivite)
route.get("/get",authentificationToken, activiteController.getAllActivites)
route.get("/get/:id",authentificationToken ,activiteController.getActiviteById)
route.delete("/delete/:id",authentificationToken, activiteController.deleteActivite)
route.put("/update/:id",authentificationToken,activiteController.updateActivite)





module.exports = route