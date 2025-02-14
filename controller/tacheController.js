const { response } = require("express")
const TacheModel = require("../model/tacheModel")
module.exports = {

    createTache: async (req, res) => {
        try {

              if (req.file) {
                    req.body.pieceJointe = req.file.filename;
              }
            const tache = await TacheModel(req.body)
            await tache.save()
            res.status(200).json({
                success: true,
                message: "data created",
                data: tache

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

    getAllTaches: async (req, res) => {
        try {
            const taches = await TacheModel.find()
            res.status(200).json({
                success: true,
                message: "taches found",
                data: taches
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

    getTacheById: async (req, res) => {
        try {
            const tacheId = req.params.id
            const tache = await TacheModel.findById(tacheId)
            res.status(200).json({
                success: true,
                message: "tache found",
                data: tache
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "tache not found",
                data: null
            })
        }
    },

    deleteTache: async (req, res) => {
        try {
            const tacheId = req.params.id
            const tache = await TacheModel.findByIdAndDelete(tacheId)
            res.status(200).json({
                success: true,
                message: "tache deleted",
                data: tache
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "tache not deleted",
                data: null
            })
        }
    },

    updateTache : async (req, res) => {
    try {
        const tacheId = req.params.id;

        const existingTache = await TacheModel.findById(tacheId);
        if (!existingTache) {
            return res.status(404).json({
                success: false,
                message: "Tache not found",
                data: null
            });
        }
    if (req.file) {
            req.body.pieceJointe = req.file.filename;
        } else {
            req.body.pieceJointe = existingTache.pieceJointe; 
        }
      
        const updatedTache = await TacheModel.findByIdAndUpdate(tacheId, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Tache updated successfully",
            data: updatedTache
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

