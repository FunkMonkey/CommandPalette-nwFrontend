
// This is a dirty hack, as frontend-main.ts require-method thinks it is next 
// to frontend-main.html and thus not in lib

var Frontend = require("./lib/Frontend");

module.exports = Frontend;