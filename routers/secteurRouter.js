const secteurController = require ("../controller/secteurController")
const route = require ("express").Router()
//const authentificationToken = require("../middleWare/authenticateToken")
const validateAttribut = require ("../middleWare/validate")


route.post("/add",validateAttribut(["libelle","code"]) ,secteurController.createSecteur)
route.get("/get" ,secteurController.getAllSecteurs)
route.get("/get/:id" ,secteurController.getSecteurById)
route.delete("/delete/:id" ,secteurController.deleteSecteur)
route.put("/update/:id" ,secteurController.updateSecteur)





module.exports = route