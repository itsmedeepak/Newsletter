
const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

const port = 3000;
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    "FNAME": fname,
                    "LNAME": lname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/dbf22ad422";

    const options = {
        method: "POST",
        auth: "deepak1:988dcf0a0bc95308f4e3f122c69030ff-us6"
    }
    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
        })
    })
    console.log()
    request.write(jsonData);
    request.end();


    res.sendFile(__dirname + '/sucess.html')

})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// 988dcf0a0bc95308f4e3f122c69030ff-us6
// dbf22ad422