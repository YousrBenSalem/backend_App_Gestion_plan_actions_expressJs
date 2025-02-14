const { response } = require("express")
const activiteModel = require("../model/activiteModel")
module.exports = {

    createActivite: async (req, res) => {
        try {
            const activite = await activiteModel(req.body)
            await activite.save()
            res.status(200).json({
                success: true,
                message: "data created",
                data: activite

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

    getAllActivites: async (req, res) => {
        try {
            const activites = await activiteModel.find()
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
            const activiteId = req.params.id
            const activite = await activiteModel.findByIdAndDelete(activiteId)
            res.status(200).json({
                success: true,
                message: "activité deleted",
                data: activite
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "activité not deleted",
                data: null
            })
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

