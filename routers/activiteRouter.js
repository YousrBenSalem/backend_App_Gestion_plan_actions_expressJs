const activiteController = require ("../controller/activiteController")
const route = require ("express").Router()
const authentificationToken = require("../middleWare/authenticateToken")
const validateAttribut = require ("../middleWare/validate")




route.post("/add" ,validateAttribut(["titre","description","budget","Date_prevu","Date_lancement","Date_fin_prevu","Date_fin_lanc","TypeFinancement","priorite"]),activiteController.createActivite)
route.get("/get", activiteController.getAllActivites)
route.get("/get/:id" ,activiteController.getActiviteById)
route.delete("/delete/:id", activiteController.deleteActivite)
route.put("/update/:id",activiteController.updateActivite)





module.exports = route