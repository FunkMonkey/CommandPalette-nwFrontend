
var path = require("path");
var child_process = require('child_process');
var spawn = child_process.spawn;
var exec = child_process.exec;

var AHK_DIR = path.join(__dirname, "..", "AHK");

var Backend = require("CommandPalette-Backend");

var gui = null;

var Frontend = {

	lastWin: null,

	windoWrapper: null,
	
	hotkeyProcess: null,


	init: function init(guiModule) {
		Backend.init();
			
		gui = guiModule;
		
		this.windowWrapper = gui.Window.get();
		this.setupGlobalHotkey();

		this.setupTray();
		this.windowWrapper.minimize();
	},

	onGlobalHotkey: function onGlobalHotkey(message) {
		var self = this;
		return Backend.WindowManager.getCurrentWindow().then( function (res) {
			self.lastWin = res;
			self.windowWrapper.show();
			self.windowWrapper.focus();
		}).fail(function (e) {
			console.log(e.stack);
			// TODO throw
		});
	},

	setupTray: function setupTray() {
		// minimize to tray
		var tray;

		// Get the minimize event
		/*windowWrapper.on('minimize', function() {
				// Hide window
				this.hide();

				// Show tray
				tray = new gui.Tray({ icon: 'icon.png' });

				// // Show window and remove tray when clicked
				tray.on('click', function() {
					windowWrapper.show();
					windowWrapper.focus();
					//this.remove();
				// tray = null;
				});
			});*/
	},	

	setupGlobalHotkey: function setupGlobalHotkey() {

		this.hotkeyProcess = spawn('autohotkey.bat', [path.join(AHK_DIR, "GlobalHotkey.ahk")], 
			{ 
				cwd: process.cwd(),
				env: process.env
			});


		var messageStream = "";

		var self = this;

		this.hotkeyProcess.stdout.on('data', function (data) {
			messageStream += data;
			
			if(messageStream.indexOf("||") !== -1) {
				var messageSplit = messageStream.split("||");
				var message = JSON.parse(messageSplit[0]);
				messageStream = messageSplit[1];
				self.onGlobalHotkey(message.message);
			}

		});

		this.hotkeyProcess.stderr.on('data', function (data) {
			console.log('stderr: ' + data);
		});

		this.hotkeyProcess.on('close', function (code) {
			console.log('child process exited with code ' + code);
		});



		this.windowWrapper.on("close", function () {
			exec("taskkill /pid " + self.hotkeyProcess.pid + " /t", {}, function () {
				self.windowWrapper.close(true);
			});
			//kill(ahk_hotkey.pid, 'SIGKILL');
			//
		});
	},

	executeAction: function (actionId, actionOptions) {
		this.windowWrapper.minimize();

		return Backend.executeAction(actionId, actionOptions, this.lastWin.id);
	}
};

module.exports = Frontend;