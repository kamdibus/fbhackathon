function updateLabel() {
    chrome.storage.sync.get("enabledPlugin", function(result){
        var enabledPlugin = result.enabledPlugin;
        document.getElementById('toggle_button').value = enabledPlugin ? "Disable" : "Enable";
    });
}

function updateTags() {
    chrome.storage.sync.get("tags", function(result){
        var tags = result.tags;
        document.getElementById('tags').value = tags;
    });
}

window.onload = function () {
    updateTags();
    updateLabel();
}

window.setTimeout(function() {
    document.getElementById("toggle_button").onclick = function() {
        chrome.storage.sync.get("enabledPlugin", function(result){
            var enabledPlugin = result.enabledPlugin;
            chrome.storage.sync.set({"enabledPlugin": !enabledPlugin});
            updateLabel();
        });
    }

    document.getElementById("tags").onchange = function() {
        var tags = document.getElementById("tags").value;
        chrome.storage.sync.set({"tags": tags});
      }
}, 500);
