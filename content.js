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

var cached_imgs = new Object();

var SIZE_LIMIT = 200;

function isBigEnough(image) {
	return (image.height > SIZE_LIMIT || image.width > SIZE_LIMIT);
}

function willBeChecked(image) {
	if (!isBigEnough(image))
		return false;

	if (image.src) {
		 return (!Object.keys(cached_imgs).includes(image.src));
	}
	return false;
}

function shouldBeChanged(image, tag) {
	var result = false;
	if (!isBigEnough(image))
		return false;
	console.log('badam obrazek');
	console.log(image.src);

	if (image.src) {
		if (!localStorage.getItem(image.src)) {
			console.log('nowy!' + image.src);
			if (isDisallowed([tag], image.src)) {
				localStorage.setItem(image.src, tag);
				return true;
			}
			else {
				localStorage.setItem(image.src, '%');
				return false;
			}
		}
		else {
			return (localStorage.getItem(image.src) == tag);
		}
	}
	console.log('oto result:');
	console.log(result);
	return result;
}

var isAllDead = false;

function isAllDisabled() {
	return isAllDead;
}


// hack, I do it before page loads
// for (i in document.images) {
// 		var image = document.images[i];

// 		console.log(isBigEnough(image));
// 		if (isBigEnough(image)) {
// 			image.srcset = newSrcList;
// 			image.src = bmo;
// 		}
// 	}

var imgs_to_check = [];

window.addEventListener('load', function () {
	var body = document.body;
	var elements = document.body.getElementsByTagName("*");

	var howMany = 0;
	for (i in document.images) {
			var image = document.images[i];
			if (willBeChecked(image))
				howMany++;
			if (shouldBeChanged(image)) {
				console.log('zrodlo 1');
				
				image.srcset = newSrcList;
				image.src = bmo;
			}
	} //szybciej 1
	console.log('partia 1: ' + howMany.toString());
	


	/* MutationObserver callback to add images when the body changes */
	var callback = function( mutationsList, observer ){
		chrome.storage.sync.get("enabledPlugin", function(result) {
			if (result === undefined)
				return;

			if (result.enabledPlugin) {

				var howMany2 = 0;
				for (i = 0; i < mutationsList.length; i++ ) {
					var mutation = mutationsList[i];
					if (mutation.target.tagName == "IMG") {
							if (!our_images.includes(mutation.target.src)) {
								if (willBeChecked(mutation.target))
									howMany2++;
								if (shouldBeChanged(mutation.target)) {
									console.log('zrodlo 2');
									
									mutation.target.src = bmo;
									mutation.target.srcset = newSrcList;
								}
							}
						}
					

					if ( mutation.type == 'childList' ) {
						var howMany = 0;
						var imagesChildren = mutation.target.getElementsByTagName("IMG");
						for (imgChild in imagesChildren) {
							if (willBeChecked(imagesChildren[imgChild]))
								howMany++;
							if (shouldBeChanged(imagesChildren[imgChild])) {
								console.log('zrodlo 3');
								
								imagesChildren[imgChild].src = bmo;
								imagesChildren[imgChild].srcset = newSrcList;
							}
						} 
						console.log('partia zawierała ' + howMany.toString());
						//szybciej 3
						var howMany3 = 0;

						// Array.prototype.forEach.call( mutation.target.children, function ( child ) {
						// 	var style = child.currentStyle || window.getComputedStyle(child, false);
						// 	if ( child.tagName === "IMG" || child.tagName === "img") {
						// 		images.push( child.src ); // save image src
						// 		image_parents.push( child.parentNode ); // save image parent
						// 		if (shouldBeChanged(child)) {
						// 			howMany3++;
						// 			child.src = jake;
						// 		}
						// 	}
						// 	if ( style.backgroundImage != "none" ) {
						// 		bg_images.push( style.backgroundImage.slice( 4, -1 ).replace(/['"]/g, ""));
						// 	}

						// } );
						console.log('partia4 zawiera ' + howMany3.toString());
					}
				}
				console.log('partia3 zawiera ' + howMany2.toString());
			}
			console.log('ile w cache? ' + Object.keys(cached_imgs).length.toString());
		});
	}

	var observer = new MutationObserver( callback );
	var config = { 
					characterData: true,
					attributes: true,
					childList: true,
					subtree: true };

	observer.observe( body, config );
});

var newSrcList = bmo + ' 640w, ' + bmo + ' 750w, ' + bmo + ' 1080w';
