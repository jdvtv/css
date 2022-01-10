<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script>
const collapseButton = document.getElementById("collapse");
const playlist = document.getElementById("playlist");

collapseButton.onclick = function () {
  if (collapseButton.className == "fas fa-angle-down") {
    collapseButton.className = "fas fa-angle-up";
    playlist.style.display = "block";
  } else {
    collapseButton.className = "fas fa-angle-down";
    playlist.style.display = "none";
  }
};

//
const collapse2Button = document.getElementById("collapse2");
const playlist2 = document.getElementById("playlist2");

collapse2Button.onclick = function () {
  if (collapse2Button.className == "fas fa-angle-down") {
    collapse2Button.className = "fas fa-angle-up";
    playlist2.style.display = "block";
  } else {
    collapse2Button.className = "fas fa-angle-down";
    playlist2.style.display = "none";
  }
};

//
var vid1 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/24715/movie1.mp4';
var vid2 = 'https://drive.google.com/uc?export=download&id=1OePkkm06wif2QDkHAMZZrPFIJgwv3OvV';
var vid3 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/24715/movie3.mp4';

var vid4 = 'https://www.youtube.com/embed/GhZ--UXzPfk';
var vid5 = 'https://www.youtube.com/embed/O-D1VsX7J4s';
var vid6 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/24715/movie3.mp4';

var vid7 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/24715/movie1.mp4';
var vid8 = 'https://www.youtube.com/embed/O-D1VsX7J4s';
var vid9 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/24715/movie3.mp4';

var vid10 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/24715/movie1.mp4';
var vid11 = 'https://www.youtube.com/embed/O-D1VsX7J4s';
var vid12 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/24715/movie3.mp4';

$('.listItem1').on('click', function(){
	console.log('hola');
	$('video').attr('src', vid1);
});

$('.listItem2').on('click', function(){
	$('video').attr('src', vid2);
});

$('.listItem3').on('click', function(){
	$('.video').attr('src', vid3);
});

$('.listItem4').on('click', function(){
	$('video').attr('src', vid4);
});

$('.listItem5').on('click', function(){
	$('video').attr('src', vid5);
});

$('.listItem6').on('click', function(){
	$('video').attr('src', vid6);
});

$('.listItem7').on('click', function(){
	$('video').attr('src', vid7);
});

$('.listItem8').on('click', function(){
	$('video').attr('src', vid8);
});

$('.listItem9').on('click', function(){
	$('video').attr('src', vid9);
});

$('.listItem10').on('click', function(){
	$('video').attr('src', vid10);
});

$('.listItem11').on('click', function(){
	$('video').attr('src', vid11);
});

$('.listItem12').on('click', function(){
	$('video').attr('src', vid12);
});


</script>
