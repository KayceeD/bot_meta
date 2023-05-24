'use strict'
const express = require('express')
const bodyParser = require('body-parser');
const ejs = require('ejs')
const request = require('request')


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


    if(body.object === "page"){
        body.entry.forEach(entry => {
            let webhookEvent = entry.messaging[0];
            console.log(webhookEvent);

            let senderPsid = webhookEvent.sender.id;
            console.log(`Sender PSID: ${senderPsid}`);

            if(webhookEvent.message){
                handleMessage(senderPsid,webhookEvent.message);
            }

        });
        res.status(200).send('event received');
    } else {
        res.sendStatus(404);
    }
});

const handleMessage = (sender_psid, received_message) => {
    let response;

    if (received_message.text) {
        response = {
            'text':`You sent the message: ${received_message.text}`
        }
    }
    callSendAPI(sender_psid,response);
}

const callSendAPI = (sender_psid, response) => {
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

    let requestBody = {
        'recipient': {
            'id': sender_psid
        },
        'message': response
    }

    request({
        'uri': 'https://graph.facebook.com/v2.6/me/messages',
        'qs': { 'access_token': PAGE_ACCESS_TOKEN },
        'method': 'POST',
        'json': requestBody
    }, (err, _res, _body) => {
        if (!err) {
          console.log('Message sent!');
        } else {
          console.error('Unable to send message:' + err);
        }
    });
}

//running app
app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
})