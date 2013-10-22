(function(global) {
  var XHR = global.XMLHttpRequest;
  var document = global.document;
  var slice = global.Array.prototype.slice;

  var searchBox = document.getElementById('query');
  var throttleCb = document.getElementById('throttle');
  var resultsCntr = document.getElementById('results');
  var doThrottle = false;

  // Throttled version of search
  var throttledSearch = throttle(search, 250);

  function clear() {
    resultsCntr.innerHTML = '';
  }

  function throttle(fn, quietPeriod) {
    var throttled = false;
    var args = [];

    return function() {
      if (throttled) {
        args = slice.call(arguments);
        return;
      }

      setTimeout(function() {
        throttled = false;
        fn.apply(null, args);
      }, quietPeriod);

      throttled = true;
    }
  }

  function search(query, onsuccess, onerror) {
    if (!query.length) {
      return;
    }

    console.log('Searching for', query);

    var xhr = new XHR();
    xhr.open('GET', '/words?q=' + query, true);

    xhr.onreadystatechange = function() {
      var res;

      if (xhr.readyState === 4) {
        res = JSON.parse(xhr.response);
        if (xhr.status !== 200) {
          onerror(xhr.status, (res.error));
        } else {
          onsuccess(res);
        }
      }
    };

    xhr.send();
  }

  function displayWords(results, origQuery) {
    var ul = document.createElement('ul');
    var len = origQuery.length;

    results.forEach(function(r, i) {
      if (i < 50) {
        var hilited = r.substring(0, len), lolited = r.substring(len);
        var li = document.createElement('li');
        var strong = document.createElement('strong');
        li.innerHTML = ['<strong>', hilited, '</strong>', lolited].join('');
        ul.appendChild(li);
      }
    });

    clear();
    resultsCntr.appendChild(ul);
  }

  function displayError(message) {
    var p = document.createElement('p');
    p.classList.add('error');
    p.textContent = message;

    clear();
    resultsCntr.appendChild(p);
  }

  throttleCb.addEventListener('click', function() {
    doThrottle = throttleCb.checked;
  });

  searchBox.addEventListener('keyup', function() {
    var val = searchBox.value;
    (doThrottle ? throttledSearch : search)(val, function(res) {
      displayWords(res, val);
    }, displayError);
  });

})(this);
