(function(Worker) {

  function spin() {
    var huge_number = Math.pow(2, 30);
    var start = Date.now();
    while (huge_number--) {
      continue;
    }
    return Date.now() - start;
  }

  Worker.addEventListener('message', function(message) {
    var delta;
    if (message.data.command === 'start') {
      delta = spin();
      Worker.postMessage({
        status: 'OK',
        result: delta
      });
    } else {
      Worker.postMessage({
        status: 'ERROR',
        error: 'Cannot process message received: ' +
                 JSON.stringify(message.data)
      })
    }
  });
})(this);
