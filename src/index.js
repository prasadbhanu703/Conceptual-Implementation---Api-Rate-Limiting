const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const data = require('./initialData');
const port = 3000
app.use(express.urlencoded());


// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
let numOfApiCalls = 0;
let initialMax = null;

app.get("/api/posts", (req,res) => {
    if(numOfApiCalls >= 5) {
        res.status(429).send({message: "Exceed number of api calls"});
        return;
    }

    else {
    const parsedMax = Number(req.query.max || 10);
    const max = parsedMax > 20 ? 10 : parsedMax;
    let finalMax = max;
    
    if(initialMax !== null) {
        finalMax = Math.min(finalMax, initialMax);
    }
    
    const topMax = data.filter((value, index) => index < finalMax);
    res.send(topMax);

    if(initialMax === null) {
        initialMax = max;
        numOfApiCalls++;
        setTimeout(() => {
            initialMax = null;
            numOfApiCalls = 0;
        }, 30*1000);
    }
    else {
        numOfApiCalls++;
    }
}
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
