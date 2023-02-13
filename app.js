const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/cce6756d2c";
  const options = {
    method:"POST",
    auth: "sonigaurav950:g9d703ed50509c837e1607eb0b642b62f-us21"
  }

  const request = https.request(url, options, function (response) {

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
    response.on("data", function(data){
        console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req, res){
 res.redirect("/");
});

//    9d703ed50509c837e1607eb0b642b62f-us21

//  cce6756d2c.

app.listen(process.env.PORT || 3000, function () {
  console.log("this server is running in port 3000");
});
