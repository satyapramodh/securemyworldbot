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

intents.matches('Emergency', '/help');

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

// contact emergency services
intents.matches(/help/i, [
    function (session) {
        session.beginDialog('/help');
    }
]);


// defaults
intents.onDefault([
    function (session, args, next) {
        // show this if its a greeting
        // session.send(magicGreets);

        var card = new builder.HeroCard(session)
            .title("Secure my world bot!")
            .text("Emergency services at your finger tips")
            .images([
                 builder.CardImage.create(session, "http://docs.botframework.com/images/demo_bot_image.png")
            ]);
        var msg = new builder.Message(session).attachments([card]);
        session.send(msg);
        session.send("Hi... I'm the Secure my world bot here to assist you with emergency services. Say 'help' anytime to bring up my menu!");

        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            session.beginDialog('/help');
        }
    },
    // TODO
    function (session, results) {
      session.send('Sorry i did not get that!');
    }
]);



// dialogs
bot.dialog('/help', [
    function (session) {
        builder.Prompts.choice(session, 'What\'s your emergency?', 'Crime Report|Health|Fire|911|None');
    },
    function (session, results) {
        console.log("result", session);
        switch (results.response.index) {
            case 0:
                session.send('Contacting police for emergency');
                break;
            case 1:
                session.send('Contacting hospital for emergency services');
                break;
            case 2:
                session.send('Contacting fire for emergency services');
                break;
            case 3:
                session.send('Contacting 911 for emergency services');
                break;
            default:
                session.send('Never mind then');
                session.endDialog(magicAnswers);
                break;
}
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog(magicAnswers);
    }
]);


var magicAnswers = [
    "You know how to find me! I am here to 'help' :)",
    "Tip: Get to the menu any time with 'help'",
    "Just so you know: I provide emergency services at the click of a button",
];

var magicGreets = [
  'Hello there!',
  "How can i help?",
  "How are you doing today?",
  "Need me to respond to emergencies? Just say 'help'"
]
