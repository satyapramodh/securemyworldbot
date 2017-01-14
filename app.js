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

//=========================================================
// Bots Dialogs
//=========================================================

// bot.dialog('/', function (session) {
//     session.send('Hello World');
// });

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        console.log(results);
        session.send('Hello %s!', results.response);
        builder.Prompts.text(session, 'Hi! What is your age?');
    },
    function (session, results) {
      console.log(results);
      session.send('%s ? you are old!', results.response);
    }
]);
