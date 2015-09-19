var KEY_AUTH = "AUTH";


function onStart() {
  var userRef = new Firebase("https://bolder-buttons.firebaseio.com/users/google%3A100753637564219961362");
  console.log('onStart');
  listenForActions(userRef);
}
onStart();

function listenForActions(userRef) {
  console.log('listenForActions');
  userRef.child("actions").on("child_added", function(snapshot) {
    userRef.child("actions").child(snapshot.key()).remove();

    var bindingsRef = userRef.child('bindings');
    bindingsRef.once("value", function(bindingsSS) {
      var n = bindingsSS.numChildren();
      var i = 0;
      var desiredIndex = snapshot.val().index;
      bindingsSS.forEach(function(bindingSH) {
        var binding = bindingSH.val();
        var webpage = binding.webpage ;
        console.log('binding: ' + webpage + ", " + binding.buttonId);
        if (i++ == desiredIndex) {
          console.log('CHOSEN binding: ' + webpage + ", " + binding.buttonId);
          chrome.tabs.query({url: webpage}, function(tabs) {
            if (tabs.length == 0) {
              console.log("No matching tabs found");
              var codeToExecute;
              if (binding.buttonId) {
                codeToExecute = "document.getElementById('" + binding.buttonId + "').click();"
              } else {
                codeToExecute = "document.getElementsByClassName('" + binding.classId + "')[0].click();"
              }
              chrome.tabs.create({url: webpage, active: true}, function (createdTab) {
                chrome.tabs.executeScript(createdTab.id, {code: codeToExecute});
              });
            } else {  
              chrome.tabs.update(tabs[0].id, {active: true}, function(updatedTab) {
                var codeToExecute;
                if (binding.buttonId) {
                  codeToExecute = "document.getElementById('" + binding.buttonId + "').click();"
                } else {
                  codeToExecute = "document.getElementsByClassName('" + binding.classId + "')[0].click();"
                }
                console.log("Executing: " + codeToExecute);
                chrome.tabs.executeScript(updatedTab.id, {code: codeToExecute});
              });
            }
          });
        }
      });
    });
    
  });
}


function showAuthPopup() {

  chrome.tabs.create({url : "https://bolder-buttons.firebaseapp.com/chrome_auth.html"});

  ref.onAuth(function(authData) {
    if (authData) {
      console.log("onAuth changed Authenticated");
      listenForActions(ref.child("users").child(authData.uid));
    } else {
      console.log("onAuth changed Unauthenticated");
    }
  });
}
