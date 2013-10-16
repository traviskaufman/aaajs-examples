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
    clear();
    var start = Date.now();

    // We can use DOM here again! :)
    main.appendChild(createP('Starting at timestamp ' + start));

    // Let's set up a web worker to run our script in a background thread,
    // and set up a listener for when the worker notifies us that it's done
    // working. Notice how this is now ASYNC, we have to use an event listener
    // to catch the end of the computation. However, inside the worker script
    // the computation is still synchronous.
    var worker = new global.Worker('worker.js');
    worker.addEventListener('message', function(message) {
      var data = message.data, resP;
      if (data.status === 'OK') {
        resP = createP('Finished! Took ' + data.result + 'ms');
      } else { // Assume it's an error
        resP = createP('ERROR: ' + data.error);
        resP.classList.add('warning');
      }

      main.appendChild(resP);
    });

    // Kick off the worker
    worker.postMessage({
      command: 'start'
    });

    // Now let's set a timeout to print at a certain time. Notice that *now*
    // this will be able to print, since the long-running computation is in
    // the background.
    setTimeout(function() {
      var end = Date.now();
      main.appendChild(createP(
        'Printing at timestamp ' + end + ' (' +
        (end - start) + 'ms difference)'
      ));
    }, 0);  // NOTICE SOMETHING HERE: Did this wind up executing after 0ms?
  }

  // Non-important code below. Binds functions to DOM events
  document.querySelector('#exec').addEventListener(
    'click', run, false
  );
})(this);
