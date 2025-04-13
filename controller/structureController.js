const { response } = require("express")
const structureModel = require("../model/structureModel")
//const planModel = require("../model/planActionModel")
const secteurModel = require("../model/secteurModel")
module.exports = {

    createStructure: async (req, res) => {
        try {
            const structure = await structureModel(req.body)
            await structure.save()
            res.status(200).json({
                success: true,
                message: "data created",
                data: structure

            })
              await secteurModel.findByIdAndUpdate({_id:req.body.secteurId},{$push:{structureId:structure._id}})


            //await planModel.findByIdAndUpdate(req.body.planId,{$push:{structureId:structure._id}})
            
        }
        catch (err){
            res.status(400).json({
                success: false,
                message: "failed to create"+err,
                data: null
            })
        }
    },

    getAllStructures: async (req, res) => {
        try {
            const structures = await structureModel.find()
            res.status(200).json({
                success: true,
                message: "structures found",
                data: structures
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

    getStructureById: async (req, res) => {
        try {
            const structureId = req.params.id
            const structure = await structureModel.findById(structureId)
            res.status(200).json({
                success: true,
                message: "structure found",
                data: structure
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "structure not found",
                data: null
            })
        }
    },

    deleteStructure: async (req, res) => {
        try {
            const structureId = req.params.id
            const structure = await structureModel.findByIdAndDelete(structureId)
              if (!structure) {
            return res.status(404).json({
                success: false,
                message: "structure not found",
                data: null
            });

        }
          await secteurModel.updateMany(
                          { structureId: structureId }, // Sélectionner les utilisateurs ayant cette activité
                          { $pull: { structureId: structureId } } // Retirer l'ID de l'activité du tableau
                      );
            /*   await planModel.updateMany(
                          { structureId: structureId }, // Sélectionner les utilisateurs ayant cette activité
                          { $pull: { structureId: structureId } } // Retirer l'ID de l'activité du tableau
                      ); */
            res.status(200).json({
                success: true,
                message: "structure deleted and removed from plan",
                data: structure
            })
        }
        catch {
            res.status(400).json({
                success: false,
                message: "structure not deleted",
                data: null
            })
        }
    },

    updateStructure: async (req, res) => {
    try {
        const structureId = req.params.id;

        const existingStructure = await structureModel.findById(structureId);
        if (!existingStructure) {
            return res.status(404).json({
                success: false,
                message: "Structure not found",
                data: null
            });
        }

      
        const updatedStructure = await structureModel.findByIdAndUpdate(structureId, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Structure updated successfully",
            data: updatedStructure
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

