const responsableController = require ("../controller/responsableController")
const route = require ("express").Router()
const upload = require ("../middleware/upload")
const authentificationToken = require("../middleWare/authenticateToken")


route.post("/add",upload.single("image"),responsableController.createResponsable)
route.get("/get",responsableController.getAllRespos)
route.get("/get/:id" ,responsableController.getRespById)
route.delete("/delete/:id" ,responsableController.deleteRespo)
route.put("/update/:id" ,upload.single("image"),responsableController.updateRespo)





module.exports = route