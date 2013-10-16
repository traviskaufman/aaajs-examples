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

    printMultipleClosures: function() {
      // Save a reference to the *correct* receiver. This is a paradigm often
      // used when working with code such as this.
      var _self = this;
      _self.printTime();

      setTimeout(function() {
        // This yields the correct result
        _self.printTime();
      }, 250);
    },

    printMultipleBind: function() {
      this.printTime();

      // We use bind here to bind the correct receiver to the printTime
      // function
      setTimeout(this.printTime.bind(this), 250);
    }
  };

  document.querySelector('#closure').addEventListener(
    'click', function() { clear(); module.printMultipleClosures(); }, false
  );

  document.querySelector('#bind').addEventListener(
    'click', function() { clear(); module.printMultipleBind(); }, false
  );
})(this);
