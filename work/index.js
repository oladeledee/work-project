
const express = require('express');
const app = express();
const ejs=require('ejs');
const path = require('path');
const bodyParser=require('body-parser');

const router = express.Router();

app.use(express.urlencoded())

app.set('views',path.join(__dirname,'views'))

app.set('view engine','ejs');


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.static('public'));

const {Contact,contactSchema,validatecontact}=require('./model/signup')

router.get('/home',function(req,res){
  res.render('index')
  //__dirname : It will resolve to your project folder.
});

router.get('/about',function(req,res){
  res.render('About us')
});

router.get('/contact',function(req,res){
  res.render('Contact')
});




app.post('/contact',async (req,res)=>{
    const { error } = validatecontact(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let contact = new Contact({
      Email:req.body.Email,
      Password:req.body.Password,
      Address:req.body.Address,
      Address2:req.body.Address2,
      City:req.body.City,
      Zip:req.body.Zip});
      contact.save();
     console.log('data saved')
    res.send(contact);
    console.log('contact saved')

})


app.use('/', router);
const port=process.env.PORT||2000;
app.listen(port,()=>console.log(`listening on port ${port}...`));
