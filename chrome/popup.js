var ref = new Firebase("https://bolder-buttons.firebaseio.com/users/google:100753637564219961362/bindings");

ref.once("value", function(snapshot) {
	var bounedButtons = snapshot.val();
	var list = document.getElementById("buttons")

	document.getElementById("add").addEventListener("click", 
	function() { 
		chrome.tabs.executeScript(null, {file: "content_script.js"});
	});
	
	for(var binding in bounedButtons) {
		var button = document.createElement("button");
		button.setAttribute("id", binding);
		button.innerHTML = "Remove"
		button.addEventListener("click", function() { sendRemove(binding) });
		button.style.margin= "0px 0px 0px 30px"

		var edit = document.createElement("button");
		edit.setAttribute("id", binding);
		edit.innerHTML = "Edit"
		edit.addEventListener("click", function() { showForm(binding) });
		edit.style.margin= "0px 0px 0px 30px"

		var li = document.createElement("li");
		li.appendChild(document.createTextNode(bounedButtons[binding].title));
		li.appendChild(button);
		li.appendChild(edit);
		list.appendChild(li);
	}
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

function sendRemove(binding) {
	ref.child(binding).remove()
}

function showForm(binding) {
	var form = document.getElementById("edit");
	form.innerHTML = '<form id="buttonForm">Button Title: <input id="editName" type="text" name="buttonTitle"><button id="save"> Save </form>';
	var editButton = document.getElementById("save")
	editButton.addEventListener("click", 
	function() { 
		var editText = document.getElementById("editName").value;
		ref.child(binding).update({"title": editText})
	});
	
}
