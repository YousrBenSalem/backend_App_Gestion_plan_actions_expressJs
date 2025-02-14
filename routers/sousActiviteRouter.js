const sousActiviteController = require ("../controller/sousActiviteControlller")
const route = require ("express").Router()
const authentificationToken = require("../middleWare/authenticateToken")


route.post("/add",authentificationToken,sousActiviteController.createSousActivite)
route.get("/get",authentificationToken,sousActiviteController.getAllSousActivites)
route.get("/get/:id",authentificationToken,sousActiviteController.getSousActiviteById)
route.delete("/delete/:id",authentificationToken,sousActiviteController.deleteSousActivite)
route.put("/update/:id",authentificationToken,sousActiviteController.updateSousActivite)





module.exports = route