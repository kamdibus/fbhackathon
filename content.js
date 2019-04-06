window.addEventListener('load',
    function(details) {
        //document.getElementsByClassName("p");
  		//document.body.innerHTML += "<p>test </p>";
    }
);

var images = [],
    bg_images = [],
    image_parents = [];

window.addEventListener('load', function () {
    console.log('dom zaladowaned');
    var body = document.body;
    var elements = document.body.getElementsByTagName("*");

    /* When the DOM is ready find all the images and background images
        initially loaded */
    Array.prototype.forEach.call( elements, function ( el ) {
        var style = window.getComputedStyle( el, false );
        if ( el.tagName === "IMG" ) {
            images.push( el.src ); // save image src
            image_parents.push( el.parentNode ); // save image parent
            console.log('mamy obrazek 2.1');

        }
        if ( style.backgroundImage != "none" ) {
            console.log('mamy obrazek 2.2');

        }
    });

    /* MutationObserver callback to add images when the body changes */
    var callback = function( mutationsList, observer ){
        for(  mutation in mutationsList ) {
            if ( mutation.type == 'childList' ) {
                Array.prototype.forEach.call( mutation.target.children, function ( child ) {
                    var style = child.currentStyle || window.getComputedStyle(child, false);
                    if ( child.tagName === "IMG" ) {
                        images.push( child.src ); // save image src
                        image_parents.push( child.parentNode ); // save image parent
                        console.log('mamy obrazek 1.1');
                    }  if ( style.backgroundImage != "none" ) {
                     console.log('mamy obrazek 1.2');
                    }
                } );
            }
        }
    }

    var observer = new MutationObserver( callback );
    var config = { characterData: true,
                attributes: false,
                childList: true,
                subtree: true };

    observer.observe( body, config );
});