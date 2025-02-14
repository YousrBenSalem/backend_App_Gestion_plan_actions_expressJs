const planActionController = require ("../controller/planActionController")
const route = require ("express").Router()
const authentificationToken = require("../middleWare/authenticateToken")


route.post("/add",authentificationToken ,planActionController.createPlanAction)
route.get("/get",authentificationToken ,planActionController.getAllPlans)
route.get("/get/:id",authentificationToken,planActionController.getPlanById)
route.delete("/delete/:id",authentificationToken ,planActionController.deletePlan)
route.put("/update/:id",authentificationToken ,planActionController.updatePlan)





module.exports = route