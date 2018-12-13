//Install express server
const express = require('express');
const bodyParser = require('body-parser');
const request = require('superagent');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var mailchimpInstance   = 'us16',
    listUniqueId        = '405ec1fb36',
    mailchimpApiKey     = '889a288226a9a4f349e3dc77a10b8d6d-us16';

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.post('/subscribe', function (req, res) {
  request
    .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
    .send({
      'email_address': req.body.email,
      'status': 'subscribed'
    })
    .end(function(err, response) {
      if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
        res.send('Subscribed!');
        console.log('okay');
      } else {
        res.send('Subscribe Failed :(');
        console.log('failed');
      }
    });
});

app.post('/reach', function (req, res) {
  const request_body = {
    'email_address': req.body.email,
    'status': 'subscribed',
    'merge_fields': {
      'MESSAGE': req.body.message,
      'NAME': req.body.name,
      'CATEGORY': req.body.category
    }
  };
  request
    .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
    .send(request_body)
    .end(function(err, response) {
      if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
        res.send('Subscribed!');
        console.log('okay');
      } else {
        res.send('Subscribe Failed :(');
        console.log('failed');
      }
    });
});

app.get('/get-api-doc', function (req, res) {
  request
    .get('http://showcase.draglet.com/releases/HEAD/api-doc/' + req.query.type + '.json')
    .end(function(err, response) {
      if (err) {
        res.status(404).end();
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(response.body));
    });
});

app.all('*', function (req, res) {
  res.status(200).sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 8080);
