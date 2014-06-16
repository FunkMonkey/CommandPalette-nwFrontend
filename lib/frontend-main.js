window.addEventListener("error", function (error) {
	console.log(error);
	alert(error);
});


var gui = require('nw.gui');
var Frontend = require("./lib/Frontend");
var Backend = require("CommandPalette-Backend");

var model = {
		dropdownCtrl: {
			onExecution: function (item, index, inputValue) {
				alert(item + " " + index + " " + inputValue);
			},

			getQueryItems: function (query, oldResults) {
				return (query === "") ?  Backend.commands : Backend.commands.filter(function (elem) {
					return elem.match(query);
				});
			}
		}
	};


Frontend.init(gui);

window.addEventListener("load", function () {
	// setting up data-binding
	document.querySelector('#frontend-main-body').model = model;
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
 
// angular.module("CP", ["directives.dropdown"/*"CP.services", "CP.filters", "CP.directives"*/]).
// 	config( function () {

// 	}).
// 	controller("Main", function ($scope) {
// 		$scope.commands = ["Start", "Foobar"];
// 		$scope.values = ["Start", "Foobar"];
// 	});