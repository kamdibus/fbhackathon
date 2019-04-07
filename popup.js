function updateLabel() {
    chrome.storage.sync.get("enabledPlugin", function(result){
        var enabledPlugin = result.enabledPlugin;
        document.getElementById('toggle_button').value = enabledPlugin ? "Disable" : "Enable";
    });
}

function updateTags() {
    chrome.storage.sync.get("tags", function(result){
        var tags = result.tags;
        if(tags === undefined) {

        } else {
          document.getElementById('tags').value = tags;
        }
    });
}

function changeTags(tag) {
    var tags;
    chrome.storage.sync.get("tags", function(result){
        tags = result.tags;
        if(tags === undefined){
          document.getElementById('tags').value += tag + ',';
          chrome.storage.sync.set({"tags": tag + ','});
        } else {
          var tagsList = tags.split(',');
          var index = tagsList.findIndex(function(name) {return name===tag});
          if(index!=-1)
            tagsList.splice(index, 1);
          else
            tagsList.splice(index.length, 0, tag);
          chrome.storage.sync.set({"tags": tagsList.join()});
          updateTags();
        }
    });
}

function setChecked(tag) {
  if(tag === "cat"){
    document.getElementById("cat").checked=true;
    return;
  }
  if(tag === "dog"){
    document.getElementById("dog").checked=true;
    return;
  }
  if(tag === "pizza"){
    document.getElementById("pizza").checked=true;
    return;
  }
}

function setSwitches() {
  var tags;
  chrome.storage.sync.get("tags", function(result){
      tags = result.tags;
      if(tags === undefined){

      } else {
        var tagsList = tags.split(',');
        console.log(tagsList.join());
        for(var i in tagsList) {
          setChecked(tagsList[i]);
        }
      }
  });
}

window.onload = function () {
    updateTags();
    setSwitches();
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

    document.getElementById("cat").onclick = function() { changeTags("cat"); };
    document.getElementById("dog").onclick = function() { changeTags("dog"); };
    document.getElementById("pizza").onclick = function() { changeTags("pizza"); };

}, 500);
