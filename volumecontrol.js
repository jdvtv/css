$('#screen').on('swipeleft',function(){
     $(".white-select").css("animation","explosion 0.7s ease-in").css("animation-fill-mode","forwards");
});

$('#screen').on('swiperight',function(){
     $(".white-select-left").css("animation","explosion 0.7s ease-in").css("animation-fill-mode","forwards");
});
function volumeup(){
  $("#container-volume").show();
    setTimeout(function(){
      $("#container-volume").hide();
  }, 4000);
  document.getElementById("control").stepUp(1);
}

function volumedown(){
  $("#container-volume").show();
  setTimeout(function(){
      $("#container-volume").hide();
  }, 4000);
  document.getElementById("control").stepDown(1);
}
