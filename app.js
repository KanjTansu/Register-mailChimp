//express npm
const express = require('express');
const app = express();
const https = require('https');

//Body-parser module
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

//Gets module
const request = require("request");

//mailChimp APIKey
const apiKeyMailChimp = "fcf6a4471e8ba36778ba562e7e6d8543-us21" ;
const client = require("@mailchimp/mailchimp_marketing");
const { response } = require('express');
const e = require('express');
const listID = "3eb9f9015f"; 
client.setConfig({apiKey: "fcf6a4471e8ba36778ba562e7e6d8543-us21" ,  server: "us21",});



app.use(express.static("public"));

app.get("/", function (req,res) {
    res.sendFile(__dirname + "/signup.html")    
})

app.post("/", function (req,res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const eMail = req.body.eMail;
    console.log(firstName, lastName, eMail);
    const subscribingUser ={
        firstName:firstName,
        lastName:lastName,
        email:eMail
    } 

    const run = async() =>{
        try {
            const response = await client.lists.addListMember("3eb9f9015f",{
                email_address: subscribingUser.email,
                status: "subscribed",
                merge_fields:{
                    FNAME: subscribingUser.firstName,
                    LNAME: subscribingUser.lastName
                }
            })    
            console.log(response.statusCode);
            res.sendFile(__dirname + "/success.html")
        } catch (error) {
            console.log(error.status);
            res.sendFile(__dirname + "/failure.html")
        }
        
    }
    run();
    
  
    
    // const jsonData = JSON.stringify(data);
    // const url = "https://us21.api.mailchimp.com/3.0/lists/3eb9f9015f" 
    // const options = {
    //     method: "POST",
    //     auth: "kanj:fcf6a4471e8ba36778ba562e7e6d8543-us21"
    // }
    // const request = https.request(url, options, function (response) {
    //     response.on("data", function (data) {
    //     console.log(JSON.parse(data));
    //  })
    // })
    // request.write(jsonData);
    // request.end();
})
app.post("/failure", function (req,res) {
    res.redirect("/");    
})

app.listen(proces.env.PORT || 3000 , function () {
    console.log("Server running on port " + port);
})