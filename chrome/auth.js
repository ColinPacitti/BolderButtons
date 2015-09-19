var ref = new Firebase("https://bolder-buttons.firebaseio.com");
ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
  	//Add pop up?
    console.log("Login Failed!", error);
  } else {
  	//upload data to DB
    console.log("Authenticated successfully with payload:", authData);
  }
});