// bot.dialog('/', function (session) {
//     session.send('Hello World');
// });

// bot.dialog('/', [
//     function (session) {
//         builder.Prompts.text(session, 'Hi! What is your name?');
//     },
//     function (session, results) {
//         console.log(results);
//         session.send('Hello %s!', results.response);
//         builder.Prompts.text(session, 'Hi! What is your age?');
//     },
//     function (session, results) {
//       console.log(results);
//       session.send('%s ? you are old!', results.response);
//     }
// ]);

// bot.dialog('/',[
//   function (session, args, next) {
//     if(!session.userData.id || !session.userData.name){
//       session.beginDialog('/profile');
//
//     } else {
//       next();
//     }
//   },
//   function (session) {
//     session.send("Welcome %s", session.userData.name);
//   }
// ]);

// bot.dialog('/profile', [
//   function (session, args, next) {
//     if(!session.userData.name){
//       builder.Prompts.text(session, "Hey! Whats your name?");
//     }
//   },
//   function (session, results) {
//     if(results && results.response){
//       session.userData.name = results.response;
//     }
//     if(!session.userData.id){
//       builder.Prompts.text(session, "So Whats your unique id?");
//     }
//   },
//   function (session, results) {
//     if(results && results.response){
//       session.userData.id = results.response;
//     }
//     // end dialog and get back to caller
//     session.endDialog();
//   }
// ])
