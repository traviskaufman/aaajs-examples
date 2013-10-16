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

  // Create an object with some methods
  var module = {
    printTime: function() {
      var d = new Date();
      var time = [
        d.getHours(), d.getMinutes(), d.getSeconds()
      ].map(function(t) {
        var s = String(t);
        return s.length < 2 ? ('0' + s) : s;
      }).join(':');

      main.appendChild(createP('Created at ' + time));
    },

    printMultiple: function() {
      this.printTime();

      setTimeout(function() {
        // What does this yield?
        this.printTime();
      }, 250);
    }
  };

  // Non-important code below. Binds functions to DOM events
  document.querySelector('#exec').addEventListener(
    'click', function() { module.printMultiple(); }, false
  );
})(this);
