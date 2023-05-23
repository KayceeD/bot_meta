'use strict'
const express = require('express')
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.urlencoded(
    { extended: false}
));

app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send('Hello World')
});

app.get('/webhook',(req,res) => {

})

app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
})