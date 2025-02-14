const { response } = require("express")
const userModel = require ("../model/userModel")
const {randomBytes} = require("crypto");
const code = randomBytes(6).toString("hex");
const nodemailer = require("nodemailer");



module.exports = {

    createUser : async (req,res) => {
        try {
      const { email } = req.body; 

      const existingUser = await userModel.findOne({ email: email });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email",
          data: null,
        });
      }

      if (req.file) {
          req.body.image = req.file.filename;
      }

      const user = await userModel ({...req.body , code :code})
      const savedUser = await user.save()
      res.status(200).json ({
          success : true,
          message :"created successfully",
          data: savedUser
      })
      const transport = nodemailer.createTransport({
    host :"sandbox.smtp.mailtrap.io",
        port : 2525,
        secure : false ,
        auth : {
            user : '5eb65c03cb943e',
            pass : '0d8fa1526d3e9d'

        }
  });
        transport.sendMail({
            from: "User@gmail.com",
            to: savedUser.email,
            subject: "hello"+" "+ savedUser.nom,
            text: "mail de confirmation",
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1>verify account</h1>
                <a href ="http://localhost:3000/personne/verify/${savedUser.code}"> click here </a>
              
            </body>
            </html>`
        })
     } 
     catch {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      res.status(400).json ({
          success: false,
          message:"creation failed",
          data:null
      })
     }
  },
  
  
  getAllUsers : async (req,res) => {
      try {
          const user = await userModel.find()
          res.status(200).json({
              success:true,
              message:"Users found",
              data:user
          })
      }
      catch {
          res.status(400).json ({
              success:false,
              message:"failed to find users",
              data:null 
          })
      }
  },
  
  getUserById : async (req, res) => {
    try {
      const userId = req.params.id; 
      const user = await userModel.findById(userId); 

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          data: null,
        });
      }

      res.status(200).json({
        success: true,
        message: "User found",
        data: user,
      });
    } catch (error) {
      console.error("Erreur lors de la recherche de l'user :", error);
      res.status(500).json({
        success: false,
        message: "Erreur interne du serveur",
        data: null,
      });
    }
  },
  
  
  deleteUser : async (req, res) => {
      try {
      
          const deleteUserId = req.params.id
          const existingUser = await userModel.findById(deleteUserId);

          if (!existingUser) {
            return res.status(404).json({
              success: false,
              message: "User not found", 
              data: null,
            });
          }
          const user = await userModel.findByIdAndDelete(deleteUserId)
          res.status(200).json({
              success: true,
              message: "user deleted",
              data: user
          })
      }
      catch {
          res.status(400).json({
              success: false,
              message: "user not deleted",
              data: null
          })
      }
  },
   
  updateUser : async (req,res) => {
      try {
          const userId = req.params.id

      const existingUser = await userModel.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            });
        }
    if (req.file) {
            req.body.image = req.file.filename;
        } else {
            req.body.image = existingUser.image; 
        }

          const user = await userModel.findByIdAndUpdate(userId,req.body,{new:true})
          res.status(200).json({
              success:true,
              message:"update successful",
              data:user
          })
      
      }
      catch {
          res.status(400).json ({
              success:false,
              message:"failed to update",
              data:null
          })
      }
  },
   

}