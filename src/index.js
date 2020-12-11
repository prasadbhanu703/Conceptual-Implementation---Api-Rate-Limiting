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
const defaultData = [];
for(let i=0; i<10; i++) {
    defaultData[i] = data[i];
}
app.get("/api/posts" , (req, res) => {

    res.status(200).send(defaultData);
});

let count = 0;

app.get("/api/posts/:id", (req,res) => {
    
    const length = req.params.id;
    count++;
    console.log(count,"this is the count");

    const timeInterval = setInterval(() => {
        count = 0;

    } , 30 * 1000)

    if(count > 5) {
        res.status(429).send({message : "Exceed Number of API Calls"});
    }
        else {
    if(length > 20) {
        res.status(200).send(defaultData);
    } 
    else {

        const newData = [];
    for(let i=0; i<length; i++) {
        newData[i] = data[i];
    }
    res.send(newData);
    }
}

    // if(timeInterval === (30 * 1000)) {
    //     clearInterval(timeInterval);
    //     count = 0;
    // }

    
}) 

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
