var http = require('http');
var request = require('request');

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
    if (payload['status'] == 'testing') {
      color = 'blue'
    } else if (payload['status'] == 'error') {
      color = 'red'
    } else if (payload['status'] == 'success') {
      color = 'green'
    } else {
      color = 'off'
    }

//{"build":{"build_url":"https://codeship.com/projects/128515/builds/11512884","commit_url":"https://bitbucket.org/cloud66/maestro/commits/ed02f309b67586c5957afdb815de315fba9d88a3","project_id":128515,"build_id":11512884,"status":"testing","project_name":"cloud66/maestro","project_full_name":"cloud66/maestro","commit_id":"ed02f309b67586c5957afdb815de315fba9d88a3","short_commit_id":"ed02f","message":"bugfix: step 6, pass correct cloud\n","c
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

    res.writeHead(200);
    res.end("");
  });
}).listen(8080);
