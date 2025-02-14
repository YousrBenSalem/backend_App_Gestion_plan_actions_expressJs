const { response } = require("express")
const planActionModel = require("../model/planActionModel")
module.exports = {

    createPlanAction: async (req, res) => {
        try {
            const plan = await planActionModel(req.body)
            await plan.save()
            res.status(200).json({
                success: true,
                message: "data created",
                data: plan

            })
        }
        catch (err){
            res.status(400).json({
                success: false,
                message: "failed to create"+err,
                data: null
            })
        }
    },

    getAllPlans: async (req, res) => {
        try {
            const plans = await planActionModel.find()
            res.status(200).json({
                success: true,
                message: "plans found",
                data: plans
            })
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "failed to find" + err,
                data: null
            })
        }
    },

    getPlanById: async (req, res) => {
        try {
            const planId = req.params.id
            const plan = await planActionModel.findById(planId)
            res.status(200).json({
                success: true,
                message: "plan found",
                data: plan
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "plan not found",
                data: null
            })
        }
    },

    deletePlan: async (req, res) => {
        try {
            const planId = req.params.id
            const plan = await planActionModel.findByIdAndDelete(planId)
            res.status(200).json({
                success: true,
                message: "plan deleted",
                data: plan
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "plan not deleted",
                data: null
            })
        }
    },

    updatePlan: async (req, res) => {
    try {
        const planId = req.params.id;

        const existingPlan = await planActionModel.findById(planId);
        if (!existingPlan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found",
                data: null
            });
        }

      
        const updatedPlan = await planActionModel.findByIdAndUpdate(planId, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Plan updated successfully",
            data: updatedPlan
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Update failed",
            data: null
        });
    }
    }



}

