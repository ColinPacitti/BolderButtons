var KEY_AUTH = "AUTH";
var ref = new Firebase("https://bolder-buttons.firebaseio.com/");
var userRef = null;

function onStart() {
  console.log('onStart');
  var uid = localStorage.getItem(KEY_AUTH);
  if (uid) {
    console.log('uid = ' + uid);
    userRef = ref.child("users").child(uid);
    userRef.once("value", function(snapshot) {
      if (snapshot.exists()) {
        listenForActions(userRef);
      }
    });
  } else {
    showAuthPopup();
  }
}

chrome.browserAction.onClicked.addListener(function (tab) { onStart(); });

//onStart();

function listenForActions(userRef) {
  console.log('listenForActions');
  
  userRef.child("actions").on("child_added", function(snapshot) {
    alert('ACTION: ' + snapshot.val().index);
  });
}


function showAuthPopup() {

  chrome.tabs.create({url : "https://bolder-buttons.firebaseapp.com/chrome_auth.html"});
  onStart();
/*
  ref.authWithOAuthPopup("google", function(error, authData) {
  	if (error) {
    		//Add pop up?
      	console.log("Login Failed!", error);
  	} else {
  		//upload data to DB
      	console.log("Authenticated successfully with payload:", authData);

  		  localStorage.setItem(KEY_AUTH, authData.uid);

    		userRef = ref.child("users").child(authData.uid);
    		userRef.once("value", function(snapshot) {
      		if (authData && snapshot.exists()) {
      			// User already in DB
      	    	console.log('User already in DB: ' + snapshot.val().name);
     			} else {
         			console.log('User not in DB yet');    
          		ref.child("users").child(authData.uid).set({
          			name: authData.google.displayName,
            			provider: "google"
          		});
      		}
    		}); 

        listenForActions(userRef); 
    	}
  });*/

}
