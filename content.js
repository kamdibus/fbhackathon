window.addEventListener('load',
    function(details) {
        //document.getElementsByClassName("p");
  		//document.body.innerHTML += "<p>test </p>";
    }
);

//global arrays with references

var images = [],
    bg_images = [],
    image_parents = [];

window.addEventListener('load', function () {
    var body = document.body;
    var elements = document.body.getElementsByTagName("*");

    for (i in document.images) {
      var image = document.images[i];
      console.log('FOTKA');
      console.log(image);
      var bmo = "https://images.discordapp.net/avatars/418412306981191680/2f2a22feae70021176e32fc8cdf91a98.png?size=512";
      var newSrcList = bmo + ' 640w, ' + bmo + ' 750w, ' + bmo + ' 1080w';
      image.srcset = newSrcList;
      image.src = bmo;
    }
    /* When the DOM is ready find all the images and background images
        initially loaded */
    Array.prototype.forEach.call( elements, function ( el ) {
        var style = window.getComputedStyle( el, false );
        if ( el.tagName === "IMG" || el.tagName === "img") {
            images.push( el.src ); // save image src
            image_parents.push( el.parentNode ); // save image parent
            console.log('mamy obrazek 2.1');
            console.log(el.src);
            el.src = "https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/3/3b/Jakesalad.png/revision/latest?cb=20160503014517";
        }
        if ( style.backgroundImage != "none" ) {
            bg_images.push( style.backgroundImage.slice( 4, -1 ).replace(/['"]/g, "")); // save background image url
            console.log(style.backgroundImage.slice( 4, -1 ).replace(/['"]/g, ""));
            console.log('mamy obrazek 2.2');

        }
    });

    /* MutationObserver callback to add images when the body changes */
    var callback = function( mutationsList, observer ){
        // for (i in document.images) {
        //   var image = document.images[i];
        //   console.log('FOTKA');
        //   console.log(image);
        //   var bmo = "https://images.discordapp.net/avatars/418412306981191680/2f2a22feae70021176e32fc8cdf91a98.png?size=512";
        //   var newSrcList = bmo + ' 640w, ' + bmo + ' 750w, ' + bmo + ' 1080w';
        //   image.srcset = newSrcList;
        //   image.src = bmo;
        // }
        console.log(mutationsList);
        console.log(mutationsList[0]);
        for (i = 0; i < mutationsList.length; i++ ) {
            var mutation = mutationsList[i];
          
            for (var j = 0; j < mutation.addedNodes.length; j++) {
            // Check if we appended a node type that isn't
            // an element that we can search for images inside,
            // like a text node.
            node = mutation.addedNodes[j];
            if (typeof node.getElementsByTagName !== 'function') {
                  return;
              }

              var imgs = node.getElementsByTagName('img');
              //for every new image
              for (var k = 0; k < imgs.length; k++)
                imgs[k].src = "https://www.partyrama.co.uk/wp-content/uploads/2015/09/adventure-time-finn-the-human-lifesize-cardboard-cutout-137cm-product-image.jpg";
                var bmo = "https://images.discordapp.net/avatars/418412306981191680/2f2a22feae70021176e32fc8cdf91a98.png?size=512";
                var newSrcList = bmo + ' 640w, ' + bmo + ' 750w, ' + bmo + ' 1080w';
                imgs[k]['srcset'] = newSrcList;
            }

            if ( mutation.type == 'childList' ) {
                console.log('NASZA MUTACJA');
                if (mutation.target.nodename = "IMG")
                  console.log("JEST IMG");
                Array.prototype.forEach.call( mutation.target.children, function ( child ) {
                    var style = child.currentStyle || window.getComputedStyle(child, false);
                    if ( child.tagName === "IMG" || child.tagName === "img") {
                        images.push( child.src ); // save image src
                        image_parents.push( child.parentNode ); // save image parent
                        console.log('mamy obrazek 1.1');
                        child.src = "https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/3/3b/Jakesalad.png/revision/latest?cb=20160503014517";
                    }
                    if ( style.backgroundImage != "none" ) {
                      bg_images.push( style.backgroundImage.slice( 4, -1 ).replace(/['"]/g, ""));
                      console.log(style.backgroundImage.slice( 4, -1 ).replace(/['"]/g, ""));
                      console.log('mamy obrazek 1.2');
                    }

                } );
            }
        }
    }

    var observer = new MutationObserver( callback );
    var config = { characterData: true,
                attributes: true,
                childList: true,
                subtree: true };

    observer.observe( body, config );
});