const mongoose=require('mongoose');
const express =require('express');
const Joi=require('joi');
mongoose.connect("mongodb://localhost:27017/contact")
.then(() => console.log('Connected to contact...'))
  .catch(err => console.error('Could not connect to MongoDB...'));






const contactSchema=new mongoose.Schema({
    Email:{
      type:String,
      minlength:5,
      required:true,
      maxlength:255
    },
    Password:{ type:String},
    Address:{type:String},
      Address2:{type:String},
      State:{type:String},
      City:{type:String},
      Zip:{type:String}
        
  });
  
  const Contact= mongoose.model('contact',contactSchema);
  
  function validatecontact(contact) {
      const schema = {
        email: Joi.string().min(5).max(225).required().email(),
        password:Joi.string().min(5).max(224),
        address: Joi.string(),
        address1: Joi.string(),
        state: Joi.string(),
        city: Joi.string(),
        zip: Joi.string()

      };
    
      return Joi.validate(contact,schema);
    }
  
  
    exports.Contact=Contact ;
    exports.contactSchema=contactSchema;
    exports.validatecontact=validatecontact;
  