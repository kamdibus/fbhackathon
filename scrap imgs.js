var images = [],
    bg_images = [],
    image_parents = [];
document.addEventListener('DOMContentLoaded', function () {
    "use strict";
    var body = document.body;
    var elements = document.body.getElementsByTagName("*");

    /* When the DOM is ready find all the images and background images
        initially loaded */
    Array.prototype.forEach.call( elements, function ( el ) {
        var style = window.getComputedStyle( el, false );
        if ( el.tagName === "IMG" ) {
            images.push( el.src ); // save image src
            image_parents.push( el.parentNode ); // save image parent

        }  if ( style.backgroundImage != "none" ) {

            bg_images.push( /*style.backgroundImage.slice( 4, -1 ).replace(/['"]/g, ""*/); // save background image url
        }
    });

    /* MutationObserver callback to add images when the body changes */
    var callback = function( mutationsList, observer ){
        for( var mutation of mutationsList ) {
            if ( mutation.type == 'childList' ) {
                Array.prototype.forEach.call( mutation.target.children, function ( child ) {
                    var style = child.currentStyle || window.getComputedStyle(child, false);
                    if ( child.tagName === "IMG" ) {
                        images.push( child.src ); // save image src
                        image_parents.push( child.parentNode ); // save image parent
                    }  if ( style.backgroundImage != "none" ) {
                     // bg_images.push( style.backgroundImage.slice( 4, -1 ).replace(/['"]/g, "")); // save background image url
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