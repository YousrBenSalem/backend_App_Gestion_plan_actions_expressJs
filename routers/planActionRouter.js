const planActionController = require ("../controller/planActionController")
const route = require ("express").Router()
//const authentificationToken = require("../middleWare/authenticateToken")
const validateAttribut = require ("../middleWare/validate")


route.post("/add",validateAttribut(["titre","description","date_creation","date_validation"]),planActionController.createPlanAction)
route.get("/get",planActionController.getAllPlans)
route.get("/get/:id",planActionController.getPlanById)
route.delete("/delete/:id",planActionController.deletePlan)
route.put("/update/:id",planActionController.updatePlan)





module.exports = route