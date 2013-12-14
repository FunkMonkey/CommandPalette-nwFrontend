/// <reference path="./node.d.ts" />

declare module Aliases {
	export interface DOMWindow extends Window {

	}
}

declare module "nw.gui" {
	import events = require("events");

	export class Window extends events.EventEmitter {
		
		static get(): Window;

		window: Aliases.DOMWindow;

		showDevTools(id?: string, headless?: boolean);
		showDevTools(iframe?: HTMLIFrameElement, headless?: boolean);
	}
}