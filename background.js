window.onload = function () {
  function loadStorage() {
    console.log("Test storage access");
    if(chrome.storage === null || chrome.storage === 'undefined'){
      console.log("storage doesn't exist");
    }
    var enabledPlugin;
    chrome.storage.sync.get("enabledPlugin", function(result){
        if(result.enabledPlugin === null || result.enabledPlugin === 'undefined') {
          chrome.storage.sync.set({"enabledPlugin": true});
          console.log("prop set");
        }
    });
  }
  loadStorage();
}
