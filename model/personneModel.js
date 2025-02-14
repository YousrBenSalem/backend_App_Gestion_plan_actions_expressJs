const mongoose = require ("mongoose")
const bcrypt = require ("bcrypt")
const baseOptions = {discriminatorKey : "itemType",collection: "items"}

const personneSchema = new mongoose.Schema ({
    nom : {type:String}, 
    email : {type:String},
    password : {type:String},
    token : {type:String},
    verify: {
        type: Boolean,
        default: false
    },
    code: {type: String},

},baseOptions)
 personneSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
}) 
module.exports=mongoose.model ("personne",personneSchema)