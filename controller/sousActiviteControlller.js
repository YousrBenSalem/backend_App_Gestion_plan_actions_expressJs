const { response } = require("express")
const sousActiviteModel = require("../model/sousActiviteModel")
const activiteModel = require("../model/activiteModel")
module.exports = {

    createSousActivite: async (req, res) => {
        try {
            const sousActivite = await sousActiviteModel(req.body)
            await sousActivite.save()
            res.status(200).json({
                success: true,
                message: "data created",
                data: sousActivite

            })
              await activiteModel.findByIdAndUpdate(req.body.activiteId,{$push:{sousActiviteId:sousActivite._id}})
        }
        catch (err){
            res.status(400).json({
                success: false,
                message: "failed to create"+err,
                data: null
            })
        }
    },

    getAllSousActivites: async (req, res) => {
        try {
            const sousActivites = await sousActiviteModel.find()
            res.status(200).json({
                success: true,
                message: "sous Activites found",
                data: sousActivites
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

    getSousActiviteById: async (req, res) => {
        try {
            const sousActiviteId = req.params.id
            const sousActivite = await sousActiviteModel.findById(sousActiviteId)
            res.status(200).json({
                success: true,
                message: "Sous Activité found",
                data: sousActivite
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "sous activite not found",
                data: null
            })
        }
    },

    deleteSousActivite: async (req, res) => {
        try {
            const sousActiviteId = req.params.id
            const sousActivite = await sousActiviteModel.findByIdAndDelete(sousActiviteId)
  if (!sousActivite) {
            return res.status(404).json({
                success: false,
                message: "sous Activité not found",
                data: null
            });
        }
  await activiteModel.updateMany(
            { sousActiviteId: sousActiviteId }, // Sélectionner les utilisateurs ayant cette activité
            { $pull: { sousActiviteId: sousActiviteId } } // Retirer l'ID de l'activité du tableau
        );
            res.status(200).json({
                success: true,
                message: "sous activité deleted and removed from activite",
                data: sousActivite
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "sous activité not deleted",
                data: null
            })
        }
    },

    updateSousActivite: async (req, res) => {
    try {
        const sousActiviteId = req.params.id;

        const existingSousAct = await sousActiviteModel.findById(sousActiviteId);
        if (!existingSousAct) {
            return res.status(404).json({
                success: false,
                message: "Sous activité not found",
                data: null
            });
        }

      
        const updatedSousAct = await sousActiviteModel.findByIdAndUpdate(sousActiviteId, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Sous Act updated successfully",
            data: updatedSousAct
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

