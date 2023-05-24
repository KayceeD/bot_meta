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
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN
    
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if(mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('Webhook verified');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

app.post('/webhook',(req,res) => {
    let body = req.body;
    
    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, {depth : null});
})

//running app
app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
})