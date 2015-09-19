chrome.browserAction.onClicked.addListener(function(tab) { 
	
	var buttons = document.getElementsByTagName('button');

	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];

		document.createElement('div');

        self.elements.top.css({ top: Math.max(0, top - b), left: pos.left - b, width: pos.width + b, height: b });
        self.elements.bottom.css({ top: top + pos.height, left: pos.left - b, width: pos.width + b, height: 20 });
        self.elements.left.css({ top: top - b, left: Math.max(0, pos.left - b), width: b, height: pos.height + b });
        self.elements.right.css({ top: top - b, left: pos.left + pos.width, width: b, height: pos.height + (b * 2) });
	}


});
