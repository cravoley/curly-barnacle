var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");

var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel();

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = user;
};

function completeRegistration() {
    user.register()
        .then(function() {
            dialogsModule
                .alert("Your account was successfully created.")
                .then(function() {
                    frameModule.topmost().navigate("views/login/login");
                });
        }).catch(function(error) {
            console.log("Catch");
            console.dir(error);
            var msg = "Unfortunately we were unable to create your account.";
            // if(error._bodyText.message) msg = error._bodyText.message;
            // console.log(msg);
            dialogsModule
                .alert({
                    message: msg,
                    okButtonText: "OK"
                });
        });
}

exports.register = function() {
    if (user.isValidEmail()) {
        completeRegistration();
    } else {
        dialogsModule.alert({
            message: "Enter a valid email address.",
            okButtonText: "OK"
        });
    }
};


exports.back = function(){
    frameModule.topmost().navigate("views/login/login");
}
