const mongoose = require ("mongoose")

const planSchema = new mongoose.Schema ({
    titre : {type:String}, 
    description : {type:String},
    année : {type:String},
  

})


module.exports=mongoose.model ("plan",planSchema)