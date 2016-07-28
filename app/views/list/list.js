var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModule = require("ui/core/view");
var page;

var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");



var groceryList = new GroceryListViewModel();
var pageData = new Observable({
    groceryList: groceryList,
    grocery : ""
});

// pageData.set("isLoading", true);

// var pageData = new Observable({
//     groceryList: new ObservableArray([
//         { name: "eggs" },
//         { name: "bread" },
//         { name: "cereal" }
//     ])
// });

exports.loaded = function(args) {
    page = args.object;
    // console.log("Loading", pageData);
    page.bindingContext = pageData;

    var listView = page.getViewById("groceryList");

    groceryList.empty();
    pageData.set("isLoading", true);
    groceryList.load().then(function() {
        pageData.set("isLoading", false);
        // setTimeout(function(){

            listView.animate({
                opacity: 1,
                duration: 1000
            });
        // },1000);
    });
};


exports.add = function(){
    if (pageData.get("grocery").trim() === "") {
        dialogsModule.alert({
            message: "Enter a grocery item",
            okButtonText: "OK"
        });
        return;
    }


    // Dismiss the keyboard
    page.getViewById("grocery").dismissSoftInput();
    groceryList.add(pageData.get("grocery"))
        .catch(function() {
            dialogsModule.alert({
                message: "An error occurred while adding an item to your list.",
                okButtonText: "OK"
            });
        });

    // Empty the input field
    pageData.set("grocery", "");
}



var email = require("nativescript-email");
var socialShare = require("nativescript-social-share");
exports.share = function() {

        var list = [];
        var finalList = "";
        for (var i = 0, size = groceryList.length; i < size ; i++) {
            list.push(groceryList.getItem(i).name);
        }
        var listString = list.join(", ").trim();
        // socialShare.shareText(listString);


    email.available().then(function(avail) {
        if(avail){
            email.compose({
              subject: "GroceriesList",
              body: "Hello <strong>dude</strong> : this is the list: "+listString,
              to: ['eddyverbruggen@gmail.com', 'to@person2.com'],
            //   cc: ['ccperson@somewhere.com'],
            //   bcc: ['eddy@combidesk.com', 'eddy@x-services.nl'],
            //   attachments: [{
                //   fileName: 'arrow.png',
                //   path: 'base64://iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAHGlET1QAAAACAAAAAAAAABQAAAAoAAAAFAAAABQAAAB5EsHiAAAAAEVJREFUSA1iYKAimDhxYjwIU9FIBgaQgZMmTfoPwlOmTJGniuHIhlLNxaOGwiNqNEypkwlGk9RokoIUfaM5ijo5Clh9AAAAAP//ksWFvgAAAEFJREFUY5g4cWL8pEmT/oMwiM1ATTBqONbQHA2W0WDBGgJYBUdTy2iwYA0BrILDI7VMmTJFHqv3yBUEBQsIg/QDAJNpcv6v+k1ZAAAAAElFTkSuQmCC',
                //   mimeType: 'image/png'
            //   }],
              appPickerTitle: 'Compose with..' // for Android, default: 'Open with..'
          }).then(function() {
              console.log("Email composer closed");
          });
        }
    console.log("Email available? " + avail);
})
    // var list = [];
    // var finalList = "";
    // for (var i = 0, size = groceryList.length; i < size ; i++) {
    //     list.push(groceryList.getItem(i).name);
    // }
    // var listString = list.join(", ").trim();
    // socialShare.shareText(listString);
};
