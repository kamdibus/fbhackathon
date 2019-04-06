function updateLabel() {
	var enabledPlugin;
	chrome.storage.sync.get("enabledPlugin", function(result){
		enabledPlugin = result.enabledPlugin;
	});
	document.getElementById('toggle_button').value = enabledPlugin ? "Disable" : "Enable";

}

// function click() {
// 	var enabledPlugin;
// 	chrome.storage.sync.get("enabledPlugin", function(result){
// 	  enabledPlugin = result.enabledPlugin;
// 	  chrome.storage.sync.set({"enabledPlugin": !enabledPlugin});
// 	  updateLabel();
// 	});
// }

window.onload = function () {
	updateLabel();
}

window.setTimeout(function() {
	var enabledPlugin;
	document.getElementById("toggle_button").onclick = function() {
		chrome.storage.sync.get("enabledPlugin", function(result){
		  enabledPlugin = result.enabledPlugin;
		  chrome.storage.sync.set({"enabledPlugin": !enabledPlugin});
		  updateLabel();
		});
	}
}, 3000);