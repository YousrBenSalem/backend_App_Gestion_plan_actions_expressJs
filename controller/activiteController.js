const { response } = require("express")
const activiteModel = require("../model/activiteModel")
const userModel = require("../model/userModel")
const planModel = require("../model/planActionModel")
module.exports = {

    // createActivite: async (req, res) => {
    //     try {
    //         const activite = await activiteModel(req.body)
    //         await activite.save()
    //         res.status(200).json({
    //             success: true,
    //             message: "data created",
    //             data: activite

    //         })
    //           await userModel.findByIdAndUpdate({_id:req.body.userId},{$push:{activiteId:activite._id}})

    //           await planModel.findByIdAndUpdate({_id:req.body.planId},{$push:{activiteId:activite._id}})
    //     }
    //     catch (err){
    //         res.status(400).json({
    //             success: false,
    //             message: "failed to create"+err,
    //             data: null
    //         })
    //     }
    // },
createActivite: async (req, res) => {
    try {
        const activite = new activiteModel(req.body);
        await activite.save();

        // Attendre que les mises à jour soient terminées avant d'envoyer la réponse
        await Promise.all([
            userModel.findByIdAndUpdate(
                { _id: req.body.userId },
                { $push: { activiteId: activite._id } }
            ),
            planModel.findByIdAndUpdate(
                { _id: req.body.planId },
                { $push: { activiteId: activite._id } }
            )
        ]);

        // Envoyer la réponse après toutes les opérations réussies
        res.status(200).json({
            success: true,
            message: "Data created successfully",
            data: activite
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

    getAllActivites: async (req, res) => {
        try {
            const activites = await activiteModel.find().populate("userId")
          //  console.log(participantId)
            res.status(200).json({
                success: true,
                message: "activites found",
                data: activites
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

    getActiviteById: async (req, res) => {
        try {
            const activiteId = req.params.id
            const activite = await activiteModel.findById(activiteId)
            res.status(200).json({
                success: true,
                message: "Activité found",
                data: activite
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "activite not found",
                data: null
            })
        }
    },

deleteActivite: async (req, res) => {
    try {
        const activiteId = req.params.id;

        // Trouver et supprimer l'activité
        const activite = await activiteModel.findByIdAndDelete(activiteId);
        if (!activite) {
            return res.status(404).json({
                success: false,
                message: "Activité not found",
                data: null
            });
        }

        // Supprimer l'ID de l'activité dans tous les utilisateurs qui l'ont
        await userModel.updateMany(
            { activiteId: activiteId }, // Sélectionner les utilisateurs ayant cette activité
            { $pull: { activiteId: activiteId } } // Retirer l'ID de l'activité du tableau
        );

          await planModel.updateMany(
            { activiteId: activiteId }, // Sélectionner les utilisateurs ayant cette activité
            { $pull: { activiteId: activiteId } } // Retirer l'ID de l'activité du tableau
        );

        res.status(200).json({
            success: true,
            message: "Activité deleted and removed from users and plan",
            data: activite
        });

    } catch (error) {
        console.error("Error deleting activity:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        });
    }
},


    updateActivite: async (req, res) => {
    try {
        const activiteId = req.params.id;

        const existingAct = await activiteModel.findById(activiteId);
        if (!existingAct) {
            return res.status(404).json({
                success: false,
                message: "Activité not found",
                data: null
            });
        }

      
        const updatedAct = await activiteModel.findByIdAndUpdate(activiteId, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Act updated successfully",
            data: updatedAct
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

