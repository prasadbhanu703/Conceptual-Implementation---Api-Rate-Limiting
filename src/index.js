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

    res.send(defaultData);
});

app.get("/api/posts/:id", (req,res) => {
    const length = req.params.id;
    if(length > 20) {

    res.send(defaultData);
    } 
    else {
        const newData = [];
    for(let i=0; i<length; i++) {
        newData[i] = data[i];
    }

    res.send(newData);
    }
}) 

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
