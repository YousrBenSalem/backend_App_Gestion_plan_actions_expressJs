const tacheController = require ("../controller/tacheController")
const route = require ("express").Router()
const upload = require ("../middleware/upload")

const validateAttribut = require ("../middleWare/validate")



route.post("/add",upload.single("pieceJointe"),tacheController.createTache)
route.get("/get",tacheController.getAllTaches)
route.get("/get/:id",tacheController.getTacheById)
route.delete("/delete/:id",tacheController.deleteTache)
route.put("/update/:id",upload.single("pieceJointe"),tacheController.updateTache)





module.exports = route