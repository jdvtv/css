$('#screen').on('swipeleft',function(){
     $(".white-select").css("animation","explosion 0.7s ease-in").css("animation-fill-mode","forwards");
});

$('#screen').on('swiperight',function(){
     $(".white-select-left").css("animation","explosion 0.7s ease-in").css("animation-fill-mode","forwards");
});
function volumeup(){ document.getElementById("container-volume").style.display = "block"; setTimeout(function(){ document.getElementById("container-volume").style.display = "none"; }, 4000); document.getElementById("control").stepUp(1); }

function volumedown(){ document.getElementById("container-volume").style.display = "block"; setTimeout(function(){ document.getElementById("container-volume").style.display = "none"; }, 4000); document.getElementById("control").stepDown(1); }
