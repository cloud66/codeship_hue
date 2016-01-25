var http = require('http');
var request = require('request');

console.log("Started on 8080")

http.createServer(function (req, res) {
  var load = "";
  req.on('data', function (chunk) {
    load += chunk;
  });
  req.on('end', function () {
    console.log("Received")
    console.log(load)
    data = JSON.parse(load);

    payload = data['build']

    // filter by branch
    if (payload['branch'] == 'dev') {
      if (payload['status'] == 'testing') {
        color = 'blue'
      } else if (payload['status'] == 'error') {
        color = 'red'
      } else if (payload['status'] == 'success') {
        color = 'green'
      } else {
        color = 'off'
      }

      request.post(
          process.env.MAKER_ENDPOINT,
          { json: { "value1" : color }},
          function (error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log("Posted " + color)
                console.log(body)
              } else {
                console.log(error)
              }
          }
      );
    }

    res.writeHead(200);
    res.end("");
  });
}).listen(8080);
