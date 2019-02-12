
const crypto = require("crypto");
var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL



exports.encryptData = encryptData ;
exports.decryptData = decryptData ;


// the encryption and decryption should be done on user side,
// i.e front end part using the same functions as used here
// the encrypted data should be sent to the backend and inserted directly into the db
// the data should be decrypted on the front end part too.

function encryptData(req, res) {

    var user_id = req.body.user_id ;
	var firstname = req.body.firstname ;
	var lastname  = req.body.lastname ;
	var key = req.body.password ;

    var cipher = crypto.createCipher(algorithm, key);  
    var encryptedFirstname = cipher.update(firstname, 'utf8', 'hex') + cipher.final('hex');
    var encryptedLastname = cipher.update(lastname,'utf8','hex')+ cipher.final('hex');


    var Query = 'INSERT INTO user_info (user_id, firstname, lastname, created_on) VALUES ($1,$2,$3,$4)' ;

    db.none(Query,[user_id,encryptedFirstname,encryptedLastname, new Date()])
    .then(function (data) {
           res.send({
          'log': 'Data inserted successfully',
          'flag': 143,
          'data': data
        })
      })
      .catch(function (error) {
        res.send({
          'log': 'Internal server error',
          'flag': 144,
          'error': error
        })
      })

}


function decryptData (req, res) {

var user_id = req.body.user_id ;
var key = req.body.password ;

var Query = 'Select * from user_info where user_id=$1'

db.any(Query,[user_id]).
then(function(data){

	var firstname = data[0].firstname;
	var lastname  = data[0].lastname ;

})
      .catch(function (error) {
        return res.send({
          'log': 'Internal server error',
          'flag': 144,
          'error': error
        })
      })


var data = {} ;
var decipher = crypto.createDecipher(algorithm, key);

data.firstname = decipher.update(firstname, 'hex', 'utf8') + decipher.final('utf8');
data.lastname = decipher.update(lastname, 'hex', 'utf8') + decipher.final('utf8')


return res.send({

	'log' : 'Data fetched successfully' ,
	'result': data

})
}


function infixToPostFix(exp) {

	var resultStack = [] ;
    // exp = exp.split("")
    var result = "" 
console.log(exp.length)
	for(var i =0 ; i < exp.length ;i ++) {

		var res = exp[i]

	}
}


function computeValue(exp){



	       var resultStack = [];
        exp = exp.split(" ");
        for(var i = 0; i < exp.length; i++) {
            if(!isNaN(exp[i])) {
                resultStack.push(exp[i]);
            } else {
                var a = resultStack.pop();
                var b = resultStack.pop();
                if(exp[i] === "+") {
                    resultStack.push(parseInt(a) + parseInt(b));
                } else if(exp[i] === "-") {
                    resultStack.push(parseInt(b) - parseInt(a));
                } else if(exp[i] === "*") {
                    resultStack.push(parseInt(a) * parseInt(b));
                } else if(exp[i] === "/") {
                    resultStack.push(parseInt(b) / parseInt(a));
                } else if(exp[i] === "^") {
                    resultStack.push(Math.pow(parseInt(b), parseInt(a)));
                }
            }
        }
        if(resultStack.length > 1) {
            return "error";
        } else {
            return resultStack.pop();
        }

        console.log(exp)
}

infixToPostFix('((2*3) +4/ (5*2))*4')