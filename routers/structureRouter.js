const structureController = require ("../controller/structureController")
const route = require ("express").Router()
const authentificationToken = require("../middleWare/authenticateToken")


route.post("/add",authentificationToken,structureController.createStructure)
route.get("/get",authentificationToken,structureController.getAllStructures)
route.get("/get/:id",authentificationToken,structureController.getStructureById)
route.delete("/delete/:id",authentificationToken,structureController.deleteStructure)
route.put("/update/:id",authentificationToken ,structureController.updateStructure)





module.exports = route