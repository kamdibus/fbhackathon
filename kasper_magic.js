var script = document.createElement('script');

script.src = '//code.jquery.com/jquery-1.11.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

function isDisallowed(tags, sourceImageUrl, nextAction) {
	var subscriptionKey = "3ed0821c8842487585465180795285b8";

	var uriBase =
        "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze";

	var params = {
        "visualFeatures": "Description",
        "details": "",
        "language": "en",
    };

	var result = false;

	// Make the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader(
                "Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        data: '{"url": ' + '"' + sourceImageUrl + '"}',
	      async: true
    })

    .done(function(data) {
		var photoTags = data.description.tags;
		for (i in tags) {
			for (j in photoTags) {
				if (photoTags[j] === tags[i]) {
                    console.log('rozpoznano1');
					nextAction(true);
                    return;
				}
			}
		}
    nextAction(false);
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        nextAction(false);
        // Display error message.
        // var errorString = (errorThrown === "") ? "Error. " :
        //     errorThrown + " (" + jqXHR.status + "): ";
        // errorString += (jqXHR.responseText === "") ? "" :
        //     jQuery.parseJSON(jqXHR.responseText).message;
        // alert(errorString);
    });

    console.log('czy rozpoznano? ' + result.toString() );
};
