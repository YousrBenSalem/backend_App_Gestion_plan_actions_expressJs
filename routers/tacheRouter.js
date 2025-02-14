const tacheController = require ("../controller/tacheController")
const route = require ("express").Router()
const upload = require ("../middleware/upload")
const authentificationToken = require("../middleWare/authenticateToken")



route.post("/add",authentificationToken,upload.single("pieceJointe"),tacheController.createTache)
route.get("/get",authentificationToken,tacheController.getAllTaches)
route.get("/get/:id",authentificationToken,tacheController.getTacheById)
route.delete("/delete/:id",authentificationToken,tacheController.deleteTache)
route.put("/update/:id",authentificationToken,upload.single("pieceJointe"),tacheController.updateTache)





module.exports = route