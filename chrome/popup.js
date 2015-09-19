var ref = new Firebase("https://bolder-buttons.firebaseio.com/users/google:100753637564219961362/bindings");

ref.once("value", function(snapshot) {
	var bounedButtons = snapshot.val();
	var list = document.getElementById("buttons")

	for(var binding in bounedButtons) {
		var button = document.createElement("button");
		button.setAttribute("id", binding);
		button.innerHTML = "Remove"
		button.addEventListener("click", function() { sendRemove(binding) });
		button.style.margin= "0px 0px 0px 30px"

		var showInfo = document.createElement("button");
		showInfo.setAttribute("id", binding);
		showInfo.innerHTML = "Edit"
		showInfo.addEventListener("click", function() { sendRemove(binding) });
		showInfo.style.margin= "0px 0px 0px 30px"

		var li = document.createElement("li");
		li.appendChild(document.createTextNode(bounedButtons[binding].title));
		li.appendChild(button);
		li.appendChild(showInfo);
		list.appendChild(li);
	}
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

function sendRemove(binding) {
	ref.child(binding).remove()
}
