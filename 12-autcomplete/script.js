(function(global) {
  var XHR = global.XMLHttpRequest;
  var document = global.document;
  var slice = global.Array.prototype.slice;

  var searchBox = document.getElementById('query');
  var debounceCb = document.getElementById('debounce');
  var resultsCntr = document.getElementById('results');
  var doDebounce = false;
  var oldVal;

  // debounced version of search
  var debouncedSearch = debounce(search, 250);

  function clear() {
    resultsCntr.innerHTML = '';
  }

  function debounce(fn, quietPeriod) {
    var args = [];
    var timer = 0;
    var debounced = false;

    return function() {
      args = slice.call(arguments);

      if (debounced && timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(function() {
        debounced = false;
        fn.apply(null, args);
      }, quietPeriod);

      debounced = true;
    };
  }

  function search(query, onsuccess, onerror) {
    if (!query.length) {
      clear();
      return;
    }

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

  debounceCb.addEventListener('click', function() {
    doDebounce = debounceCb.checked;
  });

  searchBox.addEventListener('keyup', function() {
    var val = searchBox.value;
    if (val === oldVal) {
      // Don't make duplicate requests
      return;
    }

    oldVal = val;

    (doDebounce ? debouncedSearch : search)(val, function(res) {
      displayWords(res, val);
    }, displayError);
  });

})(this);
