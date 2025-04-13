const { response } = require("express")
const TacheModel = require("../model/tacheModel")
const sousActModel = require("../model/sousActiviteModel")
module.exports = {

    createTache: async (req, res) => {
        try {

              if (req.file) {
                    req.body.pieceJointe = req.file.filename;
              }

                 const tacheData = {
            titre: req.body.titre ? String(req.body.titre) : "",
            description: req.body.description ? String(req.body.description) : "",
            avancement: req.body.avancement ? String(req.body.avancement) : "",
            periorite: req.body.periorite ? String(req.body.periorite) : "",  // Correction de la faute "periorite" -> "priorite"
            pieceJointe: req.body.pieceJointe || "",
            sousActiviteId: req.body.sousActiviteId ? String(req.body.sousActiviteId) : null
        };
             if (!tacheData.sousActiviteId) {
            return res.status(400).json({
                success: false,
                message: "L'ID de la sous-activité est requis",
                data: null
            });
        }
            const tache = await TacheModel(tacheData)
            await tache.save()
            
            await sousActModel.findByIdAndUpdate({_id:req.body.sousActiviteId},{$push:{tacheId:tache._id}})
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
              if (!tache) {
            return res.status(404).json({
                success: false,
                message: "tache not found",
                data: null
            });
        }
          await sousActModel.updateMany(
                    { tacheId: tacheId }, // Sélectionner les taches ayant cette sous activité
                    { $pull: { tacheId: tacheId } } // Retirer l'ID de sous l'activité du tableau
                );
            
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

