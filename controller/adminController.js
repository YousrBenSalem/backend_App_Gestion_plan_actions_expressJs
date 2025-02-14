const { response } = require("express")
const adminModel = require ("../model/adminModel")
const {randomBytes} = require("crypto");
const code = randomBytes(6).toString("hex");
const nodemailer = require("nodemailer");



module.exports = {

    createAdmin : async (req,res) => {
        try {
      const { email } = req.body; 

      const existingAdmin = await adminModel.findOne({ email: email });

      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: "Admin already exists with this email",
          data: null,
        });
      }

      const admin = await adminModel ({...req.body , code :code})
      const savedAdmin = await admin.save()
      res.status(200).json ({
          success : true,
          message :"created successfully",
          data: savedAdmin
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
            from: "admin@gmail.com",
            to: savedAdmin.email,
            subject: "hello"+" "+ savedAdmin.nom,
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
                <a href ="http://localhost:3000/personne/verify/${savedAdmin.code}"> click here </a>
              
            </body>
            </html>`
        })
     } 
     catch {
      console.error("Erreur lors de la création de l'administrateur :", error);
      res.status(400).json ({
          success: false,
          message:"creation failed",
          data:null
      })
     }
  },
  
  
  getAllAdmins : async (req,res) => {
      try {
          const admin = await adminModel.find()
          res.status(200).json({
              success:true,
              message:"admins found",
              data:admin
          })
      }
      catch {
          res.status(400).json ({
              success:false,
              message:"failed to find admin",
              data:null 
          })
      }
  },
  
  getAdminById : async (req, res) => {
    try {
      const adminId = req.params.id; 
      const admin = await adminModel.findById(adminId); 

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
          data: null,
        });
      }

      res.status(200).json({
        success: true,
        message: "Admin found",
        data: admin,
      });
    } catch (error) {
      console.error("Erreur lors de la recherche de l'admin :", error);
      res.status(500).json({
        success: false,
        message: "Erreur interne du serveur",
        data: null,
      });
    }
  },
  
  
  deleteAdmin : async (req, res) => {
      try {
      
          const deleteAdmin = req.params.id
          const existingAdmin = await adminModel.findById(deleteAdmin);

          if (!existingAdmin) {
            return res.status(404).json({
              success: false,
              message: "Admin not found", 
              data: null,
            });
          }
          const admin = await adminModel.findByIdAndDelete(deleteAdmin)
          res.status(200).json({
              success: true,
              message: "admin deleted",
              data: admin
          })
      }
      catch {
          res.status(400).json({
              success: false,
              message: "admin not deleted",
              data: null
          })
      }
  },
   
  updateAdmin : async (req,res) => {
      try {
          const adminById = req.params.id
          const admin = await adminModel.findByIdAndUpdate(adminById,req.body,{new:true})
          res.status(200).json({
              success:true,
              message:"update successful",
              data:admin
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