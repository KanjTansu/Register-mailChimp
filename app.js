//express npm
const express = require('express');
const app = express();
const port = 3000;
const https = require('https');

//Body-parser module
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

//Gets module
const request = require("request");

//mailChimp APIKey
const apiKeyMailChimp = "fcf6a4471e8ba36778ba562e7e6d8543-us21" ;
const listID = "3eb9f9015f"; 


app.use(express.static("public"));

app.get("/", function (req,res) {
    res.sendFile(__dirname + "/signup.html")    
})

app.post("/", function(req, res){
 
    const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.eMail;
    console.log(firstName, lastName, email);
    // *** Construct Requesting data ***
    const data = {
        members: [
            {
              email_address: email,
              status: 'subscribed',
              merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName
              }
            }
          ]
    }
 
    // *** Stringify inputed data ***
    const jsonData = JSON.stringify(data);
 
    // *** url = "https://<data center>.api.mailchimp.com/3.0/lists/{listID}";
    const url = "https://us21.api.mailchimp.com/3.0/lists/3eb9f9015f" ;
 
    const options = {
        method: "POST",
        auth: "Kanj:fcf6a4471e8ba36778ba562e7e6d8543-us21"
    };
    
    // *** Requesting and send back our data to mailchimp ***
    const request = https.request(url, options, function(response){
        if (response.statusCode === 200) {
            console.log(response.statusCode);
            res.sendFile(__dirname + "/success.html");
        } else {
            console.log(response.statusCode);
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
 
    request.write(jsonData);
    request.end();
    
 
});

app.listen(process.env.PORT || 50001, function () {
    console.log("Server running on port " + process.env.PORT);
})