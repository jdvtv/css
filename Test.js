
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

$('.thumb-1').on('clique', function(){
	console.log('hola');
	$('video').attr('src', vid1);
});

$('.thumb-2').on('clique', function(){
	$('vídeo').attr('src', vid2);
});

$('.thumb-3').on('clique', function(){
	$('.video').attr('src', vid3);
});

$('.thumb-4').on('clique', function(){
	$('vídeo').attr('src', vid4);
});

$('.thumb-5').on('clique', function(){
	$('vídeo').attr('src', vid5);
});

$('.listItem6').on('click', function(){
	$('vídeo').attr('src', vid6);
});

$('.listItem7').on('click', function(){
	$('vídeo').attr('src', vid7);
});

$('.listItem8').on('click', function(){
	$('vídeo').attr('src', vid8);
});

$('.listItem9').on('click', function(){
	$('vídeo').attr('src', vid9);
});

$('.listItem10').on('click', function(){
	$('video').attr('src', vid10);
});

$('.listItem11').on('click', function(){
	$('vídeo').attr('src', vid11);
});

$('.listItem12').on('click', function(){
	$('vídeo').attr('src', vid12);
});



$('.listItem').hover(
  função() {
    if(! $(this).hasClass('clicked'))
      $( this ).style({'background': '#000000'}, 0);
}, função() {
    if(! $(this).hasClass("clicked'))
      $( this ).style({'background':'#000000'}, 0);
}
);

$('.listItem').click(function(){
  if($(this).hasClass('clicked'))
    $(this).removeClass('clicked');
  outro
    $(this).addClass('clicked');
})

