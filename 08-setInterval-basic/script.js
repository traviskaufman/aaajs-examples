/**
 * Demonstrates how JS executes different when on the stack rather than on
 * the queue. The code is made purposefully simple and redundant to demonstrate
 * the topics.
 */
(function(global) {
  var document = global.document,
      setTimeout = global.setTimeout;

  var main = document.getElementById('main');
  var counterEl = document.getElementById('counter');
  var counter = 0;
  var creepo = document.getElementById('creepo');
  var id;

  function start() {
    // Update the counter (about) every 1 second.
    id = setInterval(function() {
      counterEl.textContent = ++counter;
    }, 1000);

    // Fade in creepy Count von Count
    creepo.style.opacity = 1.0;
  }

  function stop() {
    clearInterval(id);
  }

  // Non-important code below. Binds functions to DOM events
  document.getElementById('start').addEventListener(
    'click', start, false
  );

  document.getElementById('stop').addEventListener(
    'click', stop, false
  );
})(this);
