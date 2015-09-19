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
    alert('ACTION: ' + snapshot.val().index);
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
