(function(global) {
  'use strict';

  var document = global.document;
  var requestAnimationFrame = global.requestAnimationFrame;
  var container = document.getElementsByClassName('container')[0];
  var boxes = document.getElementById('boxes');
  var NUM_BOXES = 5000;
  var numBoxes = NUM_BOXES;
  var timerId = 0;

  function randHex() {
    return parseInt((Math.random() * 256) % 256, 10);
  }

  function randColor() {
    var r = randHex(), g = randHex(), b = randHex();
    return ['rgb(', r, ',', g, ',', b, ')'].join('');
  }

  function clear() {
    boxes.innerHTML = '';
  }

  function stopIfOccuring() {
    if (timerId !== 0) {
      // make sure we don't have two things running at the same time
      clearInterval(timerId);
      timerId = 0;
    }
  }

  function add() {
    var box;

    box = document.createElement('div');
    box.classList.add('box');
    box.style.backgroundColor = randColor();
    boxes.appendChild(box);
  }

  function appendSync() {
    stopIfOccuring();

    clear();
    numBoxes = NUM_BOXES;
    while (numBoxes--) {
      add();
    }
  }

  function appendAsync() {
    stopIfOccuring();
    clear();
    numBoxes = NUM_BOXES;
    timerId = setInterval(function() {
      if (numBoxes-- === 0) {
        clearInterval(timerId);
        timerId = 0;
      } else {
        add();
      }
    }, 0);
  }

  document.getElementById('append-sync').addEventListener(
    'click', appendSync, false
  );

  document.getElementById('append-async').addEventListener(
    'click', appendAsync, false
  );

})(this);
