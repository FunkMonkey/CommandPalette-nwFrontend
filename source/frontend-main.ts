
/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/node-webkit.d.ts" />
/// <reference path="../declarations/angular.d.ts" />


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

module CP {

	//angular.module("CP.directives", []);
	//angular.module("CP.filters", []);
	 
	angular.module("CP", [/*"CP.services", "CP.filters", "CP.directives"*/]).
		config( () => {
	
		}).
		controller("Main", $scope => {
			$scope.commands = ["Start", "Foobar"];

		});
}