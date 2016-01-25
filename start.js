var http = require('http');
var request = require('request');

http.createServer(function (req, res) {
  var load = "";
  req.on('data', function (chunk) {
    load += chunk;
  });
  req.on('end', function () {
    data = JSON.parse(load);
    if (data['status'] == 'testing') {
      color = 'blue'
    } else if (data['status'] == 'error') {
      color = 'red'
    } else if (data['status'] == 'success') {
      color = 'green'
    } else {
      color = 'off'
    }

    request.post(
        process.env.MAKER_ENDPOINT,
        { json: { "value1" : color }},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            } else {
              console.log(error)
            }
        }
    );

    res.writeHead(200);
    res.end("");
  });
}).listen(8080);
