const structureController = require ("../controller/structureController")
const route = require ("express").Router()
//const authentificationToken = require("../middleWare/authenticateToken")
const validateAttribut = require ("../middleWare/validate")


route.post("/add",validateAttribut(["nom","lieu"]),structureController.createStructure)
route.get("/get",structureController.getAllStructures)
route.get("/get/:id",structureController.getStructureById)
route.delete("/delete/:id",structureController.deleteStructure)
route.put("/update/:id" ,structureController.updateStructure)





module.exports = route