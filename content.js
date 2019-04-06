window.addEventListener('load',
    function(details) {
        //document.getElementsByClassName("p");
  		document.body.innerHTML += "<p>test </p>";
    }
);

window.addEventListener('click',
    function(details) {
        //document.getElementsByClassName("p");
      var someimage = document.getElementById('first_id');
      var edit_save = someimage.getElementsByTagName('img')[0];
      edit_save.src = "darknet/data/food.jpg";
    }
);
