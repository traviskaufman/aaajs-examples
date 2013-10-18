/**
 * RequestAnimationFrame Demo.
 * Adapted from http://www.w3.org/TR/animation-timing/
 */
(function(global) {
  var document = global.document,
      requestAnimationFrame = global.requestAnimationFrame,
      cancelAnimationFrame = global.cancelAnimationFrame,
      PHI = 1.6180339887;


  var main = document.getElementById('main');
  var animated = document.getElementById('animated');
  // Here we save the requestId that corresponds to the next animation frame request
  var requestId = 0;
  var isMoving = false;
  var viewport = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };

  // Keycodes for arrows
  var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

  function change(el, styleProp, n) {
    var val = parseInt(el.style[styleProp], 10) + n;
    // Clamp to viewport
    var amt = Math.min(
      Math.abs(val), viewport[styleProp === 'top' ? 'height' : 'width']
    );
    // make sure sign is correct
    if (val < 0 && amt > 0) amt *= -1;
    console.log(amt);
    el.style[styleProp] = amt + 'px';
  }

  function move(el, keycode, n) {
    n = n || 1;
    var prop, fac;

    switch (keycode) {
      case UP:
        fac = -1;
        prop = 'top';
        break;
      case DOWN:
        fac = 1;
        prop = 'top';
        break;
      case LEFT:
        fac = -1;
        prop = 'left';
        break;
      case RIGHT:
        fac = 1;
        prop = 'left';
        break;
      default:
        break;
    }

    if (prop && fac) {
      change(el, prop, fac * n);
      n *= 1.12;
    }

    // Called recursively within the function
    requestId = requestAnimationFrame(function() { move(el, keycode, n); });
  }

  function onkeydown(evt) {
    var key = evt.keyCode;
    isMoving = true;
    requestId = move(animated, key);

    global.removeEventListener('keydown', onkeydown);
  }

  function onkeyup(evt) {
    if (!isMoving) {
      return;
    }

    cancelAnimationFrame(requestId);

    global.addEventListener('keydown', onkeydown, false);
  }

  animated.style.position = 'absolute';
  animated.style.left = '20px';
  animated.style.top = '20px';

  // Non-important code below. Binds functions to DOM events
  global.addEventListener('keydown', onkeydown, false);

  global.addEventListener('keyup', onkeyup, false);

})(this);
