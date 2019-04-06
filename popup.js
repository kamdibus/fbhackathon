window.onload = function () {
  function updateLabel() {
    var enabledPlugin;
    chrome.storage.sync.get("enabledPlugin", function(result){
        enabledPlugin = result.enabledPlugin;
    });
    console.log(enabledPlugin);
		document.getElementById('toggle_button').value = enabledPlugin ? "Disable" : "Enable";
	}
	document.getElementById('toggle_button').onclick = function () {
    var enabledPlugin;
    chrome.storage.sync.get("enabledPlugin", function(result){
        enabledPlugin = result.enabledPlugin;
    });
    chrome.storage.sync.set({"enabledPlugin": !enabledPlugin});
		updateLabel();
	};
	updateLabel();
}
