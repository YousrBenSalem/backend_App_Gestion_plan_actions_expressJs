const { response } = require("express")
const secteurModel = require("../model/secteurModel")
module.exports = {

    createSecteur: async (req, res) => {
        try {
            const secteur = await secteurModel(req.body)
            await secteur.save()
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
            const deleteSecteurId = req.params.id
            const secteur = await secteurModel.findByIdAndDelete(deleteSecteurId)
            res.status(200).json({
                success: true,
                message: "secteur deleted",
                data: secteur
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "secteur not deleted",
                data: null
            })
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

