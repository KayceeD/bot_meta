'use strict'
const express = require('express')
const bodyParser = require('body-parser');
const ejs = require('ejs')

const app = express()

//bodyparser
app.use(bodyParser.urlencoded(
    { extended: false}
));
app.use(bodyParser.json());

//using template engine
app.set('views');
app.set('view engine','ejs');

//static file
app.use('/public',express.static(__dirname+'/public'));


//get home
app.get('/',(req,res) => {
    res.render('index');
});

//get webhook
app.get('/webhook',(req,res) => {

})

//running app
app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
})