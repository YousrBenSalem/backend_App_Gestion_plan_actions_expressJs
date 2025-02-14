const secteurController = require ("../controller/secteurController")
const route = require ("express").Router()
const authentificationToken = require("../middleWare/authenticateToken")


route.post("/add",authentificationToken ,secteurController.createSecteur)
route.get("/get",authentificationToken ,secteurController.getAllSecteurs)
route.get("/get/:id",authentificationToken ,secteurController.getSecteurById)
route.delete("/delete/:id",authentificationToken ,secteurController.deleteSecteur)
route.put("/update/:id",authentificationToken ,secteurController.updateSecteur)





module.exports = route