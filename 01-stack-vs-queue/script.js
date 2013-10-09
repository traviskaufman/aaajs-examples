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

  function execSync() {
    clear();
    main.appendChild(createP('[sync] 1'));
    main.appendChild(createP('[sync] 2'));
    main.appendChild(createP('[sync] 3'));
  }

  function execAsync() {
    clear();
    main.appendChild(createP('[sync] 1'));

    // Notice the setTimeout here. It takes the code inside this function and
    // executes it *after* all the code on the stack has finished executing,
    // even with a timeout of 0.
    setTimeout(function() {
      main.appendChild(createP('[async] 2'));
    }, 0);

    main.appendChild(createP('[sync] 3'));
  }

  // Non-important code below. Binds functions to DOM events
  document.querySelector('#exec-sync').addEventListener(
    'click', execSync, false
  );
  document.querySelector('#exec-async').addEventListener(
    'click', execAsync, false
  );
})(this);
