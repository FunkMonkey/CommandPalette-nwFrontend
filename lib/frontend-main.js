var gui = require('nw.gui');
var Frontend = require("./lib/Frontend");

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

//angular.module("CP.directives", []);
//angular.module("CP.filters", []);
 
angular.module("CP", [/*"CP.services", "CP.filters", "CP.directives"*/]).
	config( function () {

	}).
	controller("Main", function ($scope) {
		$scope.commands = ["Start", "Foobar"];

	});