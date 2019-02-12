var pgp = require('pg-promise')(/* options */)

var db = pgp('postgres://postgres:test@127.0.0.1:5432/byjus')

var express             = require('express');
var http                = require('http');
var https               = require('https');
var app                 = express();
var users               = require('/routes/users.js')
app.set('port', process.env.PORT  || 3000);


//client id 81u3ft04g7l0hs
// client secret hPJDGuMGXUnI9Vnb
var data = {}
data.app_id = '81u3ft04g7l0hs'
data.secret = 'hPJDGuMGXUnI9Vnb'
data.scope = 'r_basicprofile'
var Linkedin = require('node-linkedin')(data.app_id, data.secret,data.scope);

var linkedin = Linkedin.init('access-token-frontend', {
    timeout: 10000 /* 10 seconds */
});


return new Promise( (fullfil, reject) => {
      linkedin.people.me( (err, user) => {
        console.log (user, "All user data attached to this.token");
        let resp = {response: user, error: null};
        if (err) resp = {response: null, error: err};
        else {
          this.email = user.emailAddress;
          this.id = user.id;


    var Query = 'INSERT INTO user_data(email, id, logged_on) VALUES($1,$2,$3)'

    db.none(Query, [email, id , new Date()])
      .then(function (data) {
        // success;]
           res.send({
          'log': 'Data inserted successfully',
          'flag': 143,
          'data': data
        })
      })
      .catch(function (error) {
        // error;

        res.send({
          'log': 'Internal server error',
          'flag': constants.responseFlags.ACTION_FAILED,
          'error': error
        })
      })


        }

        fullfil(resp)
      });
});
// ...
Linkedin.auth.setCallback('www.google.com');


var url = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81u3ft04g7l0hs&redirect_uri=https%3A%2F%2Flocalhost:3001&state=987654321&scope=r_basicprofile'

app.get('/oauth/linkedin', function(req, res) {
    // This will ask for permisssions etc and redirect to callback url.
    Linkedin.auth.authorize(res, scope);
});

app.post('/encrypt_data', users.encryptData);

app.post('/decrypt_data', users.decryptData)







 var httpServer = http.createServer(app).listen(app.get('port'), function()  {
  console.log('Express server listening on port ' + app.get('port'));
});


module.exports  = app;

