
/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/node-webkit.d.ts" />


import gui = require('nw.gui');

import Frontend = require("./Frontend")

Frontend.init(gui);

window.addEventListener("load", function () {
	//win.minimize();
});


function showDevTools() {
	gui.Window.get().showDevTools();
}

function doIt() {
	Frontend.executeAction("hotkey", { hotkey: "ctrl+p" }).fail(function (e) {
		console.log(e);
	});
}
