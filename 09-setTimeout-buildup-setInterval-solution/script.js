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

  function run() {
    // Can't handle as much
    var huge_number = Math.pow(2, 13);
    var start = Date.now();
    var id;

    main.appendChild(createP('Starting at timestamp ' + start));

    // By making this function asynchronous using setInterval, we can
    // perform this computation without blocking the UI
    id = setInterval(function() {
      if (huge_number === 0) {
        main.appendChild(createP(
          'Finished! Took ' + Date.now() - start + 'ms'
        ));
        clearInterval(id);
      } else {
        console.log(huge_number);
        huge_number -= 1;
      }
    }, 0);

    // Notice how we set the Timeout function, and *then* enter the loop.
    // However, pay attention to the output from the execution.
    setTimeout(function() {
      var end = Date.now();
      main.appendChild(createP(
        'Printing at timestamp' + end + '(' + (end - start) +
        'ms difference)'
      ));
    }, 6);

  }

  // Non-important code below. Binds functions to DOM events
  document.querySelector('#exec').addEventListener(
    'click', run, false
  );
})(this);
