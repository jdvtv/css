var items = document.querySelectorAll('.overlay');

items.forEach(item => {
  item.addEventListener('touchstart', handleTouchStart, false);
  item.addEventListener('touchmove', handleTouchMove, false);
});

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
  elm = firstTouch.target;
};

function handleTouchMove(evt) {
  if ( ! xDown || ! yDown ) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;

  if ( xDiff > 0 ) {
    elm.style.top = '0px';
  } else {
    elm.style.top = '-590px';
  }

  xDown = null;
  yDown = null;
};
