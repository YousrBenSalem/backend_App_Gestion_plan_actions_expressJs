const mongoose = require ("mongoose")

const planSchema = new mongoose.Schema ({
    titre : {type:String}, 
    description : {type:String},
    date_creation : {type:String},
    date_validation : {type:String},
    status : {type:String, default:"Pending"},
    etat: {type:String , default:"To Do"},
    responsableId : {
        type : mongoose.Types.ObjectId,
        ref: "responsable"
    },
      activiteId : [{
        type : mongoose.Types.ObjectId,
        ref: "activite"
    }],
    structureId : {
        type : mongoose.Types.ObjectId,
        ref: "structure"
    },


  

})


module.exports=mongoose.model ("plan",planSchema)