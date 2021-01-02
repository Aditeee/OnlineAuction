const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");
const { send } = require("process");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../template/views");
const partials_path = path.join(__dirname, "../template/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/", (req,res)=>{
    res.render("login")
});

app.post("/register", async (req,res) => {

    try {

       const password = req.body.password;
       const cpassword = req.body.confirmpassword;
       
       if(password===cpassword)
       {
           const registerUser = new Register({
            firstname :req.body.firstname,
            lastname: req.body.lastname,
            company : req.body.company,
            email: req.body.email,
            areacode:req.body.areacode,
            phone : req.body.phone,
            Occupation : req.body.Occupation,
            password : req.body.password,
            confirmpassword : req.body.confirmpassword
           })

           const registered = await registerUser.save();
           res.status(201).render("login");
           
       }else{  
        res.send("password are not matching")
       }
       


    } catch (error) {
        res.status(400).send(error);
    }
})

app.get("/register",(req,res) => {
    res.render("register");
})

//create a new user in our database

app.post("/login",async (req,res) =>{
   try {
       const email = req.body.email;
       const password = req.body.password;

      const useremail = await Register.findOne({email:email});
      if(useremail.password === password){
            res.status(201).render("index");
            app.get("/bike",(req,res) => {
                res.render("bike");
            })
            app.get("/hyundai",(req,res) => {
                res.render("hyundai");
            })
            app.get("/i-phone",(req,res) => {
                res.render("i-phone");
            })
            app.get("/oneplus",(req,res) => {
                res.render("oneplus");
            })
      }else{

        res.send("emails/Password are not matching!!")
      }


   } catch (error) {
       res.status(400).send("invalid email or password!")
   }
})
app.get("/login",(req,res) => {
    res.render("login");
})



app.listen(port, () => {
    console.log(`Serever is running on port number ${port}`);
})