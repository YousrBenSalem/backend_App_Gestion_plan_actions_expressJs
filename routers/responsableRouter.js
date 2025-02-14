const responsableController = require ("../controller/responsableController")
const route = require ("express").Router()
const upload = require ("../middleware/upload")
const authentificationToken = require("../middleWare/authenticateToken")


route.post("/add",upload.single("image"),responsableController.createResponsable)
route.get("/get",authentificationToken,responsableController.getAllRespos)
route.get("/get/:id",authentificationToken ,responsableController.getRespById)
route.delete("/delete/:id",authentificationToken ,responsableController.deleteRespo)
route.put("/update/:id",authentificationToken ,upload.single("image"),responsableController.updateRespo)





module.exports = route