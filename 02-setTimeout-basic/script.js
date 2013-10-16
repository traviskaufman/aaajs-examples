/**
 * Demonstrates how JS executes different when on the stack rather than on
 * the queue. The code is made purposefully simple and redundant to demonstrate
 * the topics.
 */
(function(global) {
  var document = global.document,
      setTimeout = global.setTimeout;

  var main = document.getElementById('main');

  function clear() {
    main.innerHTML = '';
  }

  function createP(txt) {
    var p = document.createElement('p');
    p.textContent = String(txt);
    return p;
  }

  function printTime() {
    var d = new Date();
    var time = [d.getHours(), d.getMinutes(), d.getSeconds()].map(function(t) {
      var s = String(t);
      return s.length < 2 ? ('0' + s) : s;
    }).join(':');

    main.appendChild(createP('Created at ' + time));
  }

  function exec() {
    clear();
    // First, we execute some code on the stack and print the time.
    printTime();

    // Now, we queue up the same function to execute (about) 3 seconds in the
    // future. Note that this is functionally equivalent to writing
    // setTimeout(function() { printTime(); }, 3000);
    setTimeout(printTime, 3000);
  }

  // Non-important code below. Binds functions to DOM events
  document.querySelector('#exec').addEventListener(
    'click', exec, false
  );
})(this);
