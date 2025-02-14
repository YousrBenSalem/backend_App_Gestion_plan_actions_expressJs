const { response } = require("express")
const structureModel = require("../model/structureModel")
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
            res.status(200).json({
                success: true,
                message: "structure deleted",
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

