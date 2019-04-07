//global arrays with references

var images = [],
  bg_images = [],
  image_parents = [];

var jake = "https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/3/3b/Jakesalad.png/revision/latest?cb=20160503014517";
var bmo = "https://images.discordapp.net/avatars/418412306981191680/2f2a22feae70021176e32fc8cdf91a98.png?size=512";

var our_images = [
  jake,
  bmo
];

var SIZE_LIMIT = 200;

function isBigEnough(image) {
  return (image.height > SIZE_LIMIT || image.width > SIZE_LIMIT);
}

var defaultTag = 'dog';

function shouldBeChanged(image, tag) {
  var result = false;
  if (!isBigEnough(image))
    return false;
  console.log('badam obrazek');
  console.log(image.src);

  if (image.src) {
    if (!localStorage.getItem(image.src)) {
      	console.log('nowy!' + image.src);
      	chrome.storage.sync.get("tags", function(result) {
      		console.log('dupa');
		  	actualTags = result.tags.split(',');
		  	actualTags.pop()
		  	console.log('tagi: ');
		  	console.log(actualTags);

	      	isDisallowed(actualTags, image.src, function(isDis) {
	        	if (isDis) {
	          		localStorage.setItem(image.src, actualTags[0]);
	          	image.srcset = newSrcList;
	        	} else {
	          		localStorage.setItem(image.src, '-' + actualTags[0]);
		          return false;
		        }
		      });
		    });
	    }
	     else {
	     	chrome.storage.sync.get("tags", function(result) {
	     		actualTags = result.tags.split(',');
		  		actualTags.pop()
		     	console.log('tagi teraz ' + actualTags[0]);
		     	console.log('fotka ma ' + localStorage.getItem(image.src));
		      	if (localStorage.getItem(image.src) == actualTags[0] || 
		      		localStorage.getItem(image.src) == ('-' + actualTags[0]))
		      		image.srcset = newSrcList;
		      });
	    }
  }
  return false;
}

var imgs_to_check = [];

var actualTags = [];

function getTags() {
	chrome.storage.sync.get("tags", function(result) {
		actualTags = result.tags.split(',');
	});
}


window.addEventListener('load', function() {
  var howMany = 0;
  for (i in document.images) {
    var image = document.images[i];

    if (shouldBeChanged(image, "dog")) {
      console.log('zrodlo 1');

      image.srcset = newSrcList;
      image.src = bmo;
    }
  }

  /* MutationObserver callback to add images when the body changes */
  var callback = function(mutationsList, observer) {
    chrome.storage.sync.get("enabledPlugin", function(result) {
      if (result === undefined)
        return;

      if (result.enabledPlugin) {

        var howMany2 = 0;
        for (i = 0; i < mutationsList.length; i++) {
          var mutation = mutationsList[i];
          if (mutation.target.tagName == "IMG") {
            if (!our_images.includes(mutation.target.src)) {
              if (shouldBeChanged(mutation.target, "dog")) {
                console.log('zrodlo 2');

                mutation.target.src = bmo;
                mutation.target.srcset = newSrcList;
              }
            }
          }

          if (mutation.type == 'childList') {
            var imagesChildren = mutation.target.getElementsByTagName("IMG");
            for (imgChild in imagesChildren) {
              if (shouldBeChanged(imagesChildren[imgChild], "dog")) {
                console.log('zrodlo 3');

                imagesChildren[imgChild].src = bmo;
                imagesChildren[imgChild].srcset = newSrcList;
              }
            }
          }
        }
      }
    });
  }

  var observer = new MutationObserver(callback);
  var config = {
    characterData: true,
    attributes: true,
    childList: true,
    subtree: true
  };

  observer.observe(body, config);
});

var busted = 'https://i.imgur.com/rvXqGUD.png';
var newSrcList = busted + ' 640w, ' + busted + ' 750w, ' + busted + ' 1080w';
