const activiteController = require ("../controller/activiteController")
const route = require ("express").Router()
const authentificationToken = require("../middleWare/authenticateToken")



route.post("/add" ,activiteController.createActivite)
route.get("/get", activiteController.getAllActivites)
route.get("/get/:id" ,activiteController.getActiviteById)
route.delete("/delete/:id", activiteController.deleteActivite)
route.put("/update/:id",activiteController.updateActivite)





module.exports = route