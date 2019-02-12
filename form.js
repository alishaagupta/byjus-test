function encryptData(){

	var user = {} 
	user.firstname = firstname ;
	user.lastname = lastname ;


	        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/encrypt_data',

            dataType: "json",
            crossDomain: true,
            success: function (msg) {

                alert("success");

            },
            error: function (request, status, error) {

                alert(error);
            }
        });
 
}