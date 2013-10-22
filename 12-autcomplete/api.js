'use strict';

var fs = require('fs');
var http = require('http');
var parseUrl = require('url').parse;
var MAX_REQUESTS = 30;
var PORT = 8000;

var server = http.createServer();

server.on('request', function(req, res) {
  var info = parseUrl(req.url, true);

  if (_handleStatic(req, res, info)) {
    return;
  }

  if (req.method !== 'GET' || info.pathname !== '/words') {
    _404(res);
    return;
  }

  _findWordsThatMatch(info.query.q, function(err, data) {
    if (err) {
      _500(err.message);
      return;
    }

    _200(res, data);
  });

});

function _handleStatic(req, res, info) {
  var pathname = info.pathname === '/' ? '/index.html' : info.pathname;
  var type, ext;
  var file = __dirname +
            (~pathname.indexOf('/vendor') ? ('/..' + pathname) : pathname);

  if (
    req.method === 'GET' &&
    fs.existsSync(file)
  ) {
    ext = file.split('.').pop();
    type = ({
      js: 'text/javascript',
      css: 'text/css',
      html: 'text/html'
    })[ext];

    res.writeHead(200, {
      'Content-Type': type
    });
    fs.createReadStream(file).pipe(res);
    return true;
  }
}

function _findWordsThatMatch(q, handler) {

  var stream = fs.createReadStream('/usr/share/dict/words');
  var matches = [];
  var error = null;

  _eachLine(stream, function(line) {
    // This kind of sucks but whatever
    if (line.indexOf(q) === 0) {
      matches.push(line);
    }
  });

  stream.on('error', function(err) {
    error = err;
  });

  stream.on('end', function() {
    handler(error, matches);
  });

}

function _eachLine(stream, handler) {
  var leading = '';

  stream.on('data', function(d) {
    var words = String(d).split('\n');
    var lastWord = words[words.length - 1];

    if (leading) {
      words[0] = leading + words[0];
    }

    words.forEach(function(w) {
      handler(w);
    });

    if (lastWord !== '\n') {
      leading = lastWord;
    }

  });
}

function _500(res, message) {
  _send(res, 500, 'application/json', {
    error: message
  });
}

function _404(res) {
  _send(res, 404, 'application/json', {
    error: 'not found'
  });
}

function _200(res, json) {
  _send(res, 200, 'application/json', json);
}

function _send(res, status, contentType, body) {

  if (contentType === 'application/json' && Object(body) === body) {
    body = JSON.stringify(body) + '\n';
  }

  res.writeHead(status, {
    'Content-Type': contentType,
    'Content-Length': body.length
  });

  res.end(body);

}

server.listen(PORT);
console.log('[listen]', PORT);
