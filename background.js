console.log("Extension working");

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log("blocking:", details.url);
        return {cancel: true };
    },
    {urls: blocked_domains},
    ["blocking"]
);

window.addEventListener('load',
    function(details) {
        //document.getElementsByClassName("p");
		document.body.innerHTML += "<p>test succeeded</p>";
    }
);