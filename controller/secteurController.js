const { response } = require("express")
const secteurModel = require("../model/secteurModel")
const structureModel = require("../model/structureModel")
module.exports = {

    createSecteur: async (req, res) => {
        try {
            const secteur = await secteurModel(req.body)
            await secteur.save()
              // Vérifier si structureId est un tableau
        if (Array.isArray(req.body.structureId) && req.body.structureId.length > 0) {
            // Ajouter le secteurId dans plusieurs structures
            await structureModel.updateMany(
                { _id: { $in: req.body.structureId } }, // Sélectionne les structures avec ces IDs
                { $push: { secteurId: secteur._id } } // Ajoute le secteur à leur tableau secteurId
            );
        }
            res.status(200).json({
                success: true,
                message: "data created",
                data: secteur

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

    getAllSecteurs: async (req, res) => {
        try {
            const secteurs = await secteurModel.find()
            res.status(200).json({
                success: true,
                message: "secteurs found",
                data: secteurs
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

    getSecteurById: async (req, res) => {
        try {
            const secteurId = req.params.id
            const secteur = await secteurModel.findById(secteurId)
            res.status(200).json({
                success: true,
                message: "secteur found",
                data: secteur
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "secteur not found",
                data: null
            })
        }
    },

  deleteSecteur: async (req, res) => {
    try {
        const secteurId = req.params.id;

        // Trouver et supprimer le secteur
        const secteur = await secteurModel.findByIdAndDelete(secteurId);
        if (!secteur) {
            return res.status(404).json({
                success: false,
                message: "Secteur not found",
                data: null
            });
        }

        // Supprimer l'ID du secteur dans toutes les structures associées
        await structureModel.updateMany(
            { secteurId: secteurId }, // Trouve toutes les structures qui contiennent ce secteur
            { $pull: { secteurId: secteurId } } // Retire l'ID du secteur de la liste
        );

        res.status(200).json({
            success: true,
            message: "Secteur deleted and removed from structures",
            data: secteur
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete: " + err,
            data: null
        });
    }
},


    updateSecteur: async (req, res) => {
    try {
        const secteurId = req.params.id;

        const existingSecteur = await secteurModel.findById(secteurId);
        if (!existingSecteur) {
            return res.status(404).json({
                success: false,
                message: "Secteur not found",
                data: null
            });
        }

      
        const updatedSecteur = await secteurModel.findByIdAndUpdate(secteurId, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Secteur updated successfully",
            data: updatedSecteur
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

