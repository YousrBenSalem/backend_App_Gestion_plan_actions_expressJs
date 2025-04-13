const sousActiviteController = require ("../controller/sousActiviteControlller")
const route = require ("express").Router()
const authentificationToken = require("../middleWare/authenticateToken")
const validateAttribut = require ("../middleWare/validate")


route.post("/add",validateAttribut(["titre","description","Date_lancement"]),sousActiviteController.createSousActivite)
route.get("/get",sousActiviteController.getAllSousActivites)
route.get("/get/:id",sousActiviteController.getSousActiviteById)
route.delete("/delete/:id",sousActiviteController.deleteSousActivite)
route.put("/update/:id",sousActiviteController.updateSousActivite)




module.exports = route