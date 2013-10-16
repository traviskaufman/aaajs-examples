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

  // DON'T EVER DO THIS!!!
  function terribleMethod() {
    var huge_number = Math.pow(2, 30);

    var start = Date.now();
    // We use console.log because this WON'T EVEN WORK with DOM elements!
    console.log('Starting at timestamp', start);

    // Notice how we set the Timeout function, and *then* enter the loop.
    // However, pay attention to the output from the execution.
    setTimeout(function() {
      var end = Date.now();
      console.log(
        'Printing at timestamp', end, '(' + (end - start) + 'ms difference)'
      );
    }, 6);

    while (huge_number--) {
      continue;
    }

    console.log('Finished!');
  }

  // Non-important code below. Binds functions to DOM events
  document.querySelector('#exec').addEventListener(
    'click', terribleMethod, false
  );
})(this);
