var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var email;

var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel({
    email: "cravoley@1234.com",
    password: "1234",
    isLoading:false
});


exports.loaded = function(args) {
    // console.dir(args);
    var page = args.object;
    // console.log(page);
    page.bindingContext = user;
        // console.log("hello", user);
    email = viewModule.getViewById(page, "email");







//     var pushPlugin = require("nativescript-push-notifications");
//       var self = this;
//       pushPlugin.register({ senderID: '<ENTER_YOUR_PROJECT_NUMBER>' }, function (data){
//           self.set("message", "" + JSON.stringify(data));
//       }, function() { });
//
//       pushPlugin.onMessageReceived(function callback(data) {
//           self.set("message", "" + JSON.stringify(data));
//       });
// };



// var pushPlugin = require("nativescript-push-notifications");
//
// var settings = {
//         // Android settings
//         senderID: '744015632682', // Android: Required setting with the sender/project number
//         notificationCallbackAndroid: function(message, pushNotificationObject) { // Android: Callback to invoke when a new push is received.
//             alert(JSON.stringify(message));
//         },
//
//         // iOS settings
//         badge: true, // Enable setting badge through Push Notification
//         sound: true, // Enable playing a sound
//         alert: true, // Enable creating a alert
//
//         // Callback to invoke, when a push is received on iOS
//         notificationCallbackIOS: function(message) {
//             alert(JSON.stringify(message));
//         }
//     };
//
//
//
//
//  var self = this;
//  pushPlugin.register(settings, function(token) {
//                         // if we're on android device we have the onMessageReceived function to subscribe
//             // for push notifications
//             if(pushPlugin.onMessageReceived) {
//                 pushPlugin.onMessageReceived(settings.notificationCallbackAndroid);
//             }
//
//             alert('Device registered successfully with '+token);
//         },
//         // Error Callback
//         function(error){
//             alert(error.message);
//         });
// pushPlugin.onTokenRefresh(function(token){
//    alert("A new token has been created"+token);
// });
 //
 // pushPlugin.onMessageReceived(function callback(data) {
 //     self.set("message", "" + JSON.stringify(data));
 // });


var dialogsModule = require("ui/dialogs");
exports.signIn = function() {
    console.log("LOADING");
    user.set("isLoading", true);
    user.login()
    .then(function(){
        user.set("isLoading", false);
    })
    .catch(function(error){
        user.set("isLoading", false);
        console.log(error);
        dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
            return Promise.reject();
    }).then(function() {
        // setTimeout(function(){
            frameModule.topmost().navigate("views/list/list");

        // }, 2000);
            // user.set("isLoading", false);
        });;
};


exports.register = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};
