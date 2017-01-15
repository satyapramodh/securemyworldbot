var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create bot and add dialogs
// Create chat bot

// Using powershell:
// $env:APPID='APPID'

var connector = new builder.ChatConnector({
    appId: process.env.APPID,
    appPassword: process.env.APPPASSWORD
});

// var connector = new builder.ConsoleConnector().listen();

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

var model = process.env.modelURL;
var recognizer = new builder.LuisRecognizer(model);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', intents);

//=========================================================
// Bots Dialogs
//=========================================================

// test change name
intents.matches(/^change name/i, [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send('Ok... Changed your name to %s', session.userData.name);
    }
]);


// defaults
intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        }
    },
    function (session, results) {
      session.send('Sorry i did not get that!');
    }
]);



// dialogs
bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

// var msg = new builder.Message()
//                 .address(alarm.address)
//                 .text("Here's your '%s' alarm.", alarm.title);
//             bot.send(msg);
