const { response } = require("express")
const planActionModel = require("../model/planActionModel")
const responsableModel = require ("../model/responsableModel")
const structureModel = require ("../model/structureModel")

module.exports = {

/*     createPlanAction: async (req, res) => {
        try {
            const plan = await planActionModel(req.body)
            await plan.save()
            res.status(200).json({
                success: true,
                message: "data created",
                data: plan

            })
    await structureModel.findByIdAndUpdate({_id:req.body.structureId},{$push:{planId:plan._id}})

    await responsableModel.findByIdAndUpdate({_id:req.body.responsableId},{$push:{planId:plan._id}})
        }
        catch (err){
            res.status(400).json({
                success: false,
                message: "failed to create"+err,
                data: null
            })
        }
    }, */

    createPlanAction: async (req, res) => {
    try {
        const plan = new planActionModel(req.body);
        await plan.save();

        // Attendre que les mises à jour soient terminées
        await Promise.all([
            structureModel.findByIdAndUpdate(
                { _id: req.body.structureId },
                { $push: { planId: plan._id } }
            ),
            responsableModel.findByIdAndUpdate(
                { _id: req.body.responsableId },
                { $push: { planId: plan._id } }
            )
        ]);

        // Envoyer la réponse après toutes les opérations réussies
        res.status(200).json({
            success: true,
            message: "Data created successfully",
            data: plan
        });
    } catch (err) {
        console.error(err);
        if (!res.headersSent) { // Vérifier si la réponse n'a pas encore été envoyée
            res.status(400).json({
                success: false,
                message: "Failed to create: " + err.message,
                data: null
            });
        }
    }
},

    getAllPlans: async (req, res) => {
        try {
            const plans = await planActionModel.find().populate("activiteId")
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
        const planId = req.params.id;

        // Supprimer le plan
        const plan = await planActionModel.findByIdAndDelete(planId);
        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found",
                data: null
            });
        }

    await structureModel.updateMany(
                  { planId: planId }, // Sélectionner les utilisateurs ayant cette activité
                  { $pull: { planId: planId } } // Retirer l'ID de l'activité du tableau
              );
        // Retirer le plan du responsable
          await responsableModel.updateMany(
                  { planId: planId }, // Sélectionner les utilisateurs ayant cette activité
                  { $pull: { planId: planId } } // Retirer l'ID de l'activité du tableau
              );
      

        // Répondre une seule fois après les deux opérations
        res.status(200).json({
            success: true,
            message: "Plan deleted and removed from responsable",
            data: plan
        });

    } catch (error) {
        console.error("Error deleting plan:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        });
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

