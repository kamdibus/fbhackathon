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

var isAllDead = false;

function isAllDisabled() {
	return isAllDead;
}


// hack, I do it before page loads
for (i in document.images) {
		var image = document.images[i];
		
		console.log(isBigEnough(image));
		if (isBigEnough(image)) {
			image.srcset = newSrcList;
			image.src = bmo;
		}
	}

window.addEventListener('load', function () {
	var body = document.body;
	var elements = document.body.getElementsByTagName("*");

	for (i in document.images) {
		var image = document.images[i];

		console.log(image.src);
		if (isBigEnough(image)) {
			image.srcset = newSrcList;
			image.src = bmo;
		}
	}
	
	Array.prototype.forEach.call( elements, function ( el ) {
		var style = window.getComputedStyle( el, false );
		if ( el.tagName === "IMG" || el.tagName === "img") {
			images.push( el.src ); // save image src
			image_parents.push( el.parentNode ); // save image parent
			console.log(el.src);
			if (isBigEnough(el))
				el.src = jake;
		}
		if ( style.backgroundImage != "none" ) {
			bg_images.push( style.backgroundImage.slice( 4, -1 ).replace(/['"]/g, "")); // save background image url
		}
	});

	/* MutationObserver callback to add images when the body changes */
	var callback = function( mutationsList, observer ){
		chrome.storage.sync.get("enabledPlugin", function(result) {
			if (result === undefined)
				return;

			if (result.enabledPlugin) {
				console.log('mutacja:');
				console.log(mutationsList);
				//console.log(mutationsList[0]);
				for (i = 0; i < mutationsList.length; i++ ) {
					console.log('mutacja ' + i.toString());
					var mutation = mutationsList[i];

					if (mutation.target.tagName == "IMG") {
						console.log('mutacja fotki');
						if (!our_images.includes(mutation.target.src)) {
							console.log('nie zawiera');
							if (isBigEnough(mutation.target)) {
								console.log('changed img');
								console.log(mutation.target);
								mutation.target.src = bmo;
								mutation.target.srcset = newSrcList;
							}
						}
					}

					if ( mutation.type == 'childList' ) {

						var imagesChildren = mutation.target.getElementsByTagName("IMG");
						for (imgChild in imagesChildren) {
							console.log(imagesChildren[imgChild].src);
							if (isBigEnough(imagesChildren[imgChild]))
								imagesChildren[imgChild].srcset = newSrcList;
						}

						Array.prototype.forEach.call( mutation.target.children, function ( child ) {
							var style = child.currentStyle || window.getComputedStyle(child, false);
							if ( child.tagName === "IMG" || child.tagName === "img") {
								images.push( child.src ); // save image src
								image_parents.push( child.parentNode ); // save image parent
								//console.log('mamy obrazek 1.1');
								console.log(child.src);
								if (isBigEnough(child))
									child.src = jake;
							}
							if ( style.backgroundImage != "none" ) {
								bg_images.push( style.backgroundImage.slice( 4, -1 ).replace(/['"]/g, ""));
								//console.log(style.backgroundImage.slice( 4, -1 ).replace(/['"]/g, ""));
								//console.log('mamy obrazek 1.2');
							}

						} );
					}
				}
			}
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
