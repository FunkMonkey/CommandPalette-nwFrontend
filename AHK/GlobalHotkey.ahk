#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

#include %A_ScriptDir%/../node_modules/CommandPalette-Backend/AHK/stdio.ahk
#include %A_ScriptDir%/../node_modules/CommandPalette-Backend/AHK/JSON.ahk

#n::
	obj := { message: "hotkey" }
	stdout(JSON.stringify(obj) . "||")
return
