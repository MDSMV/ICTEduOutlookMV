# before running the script
# npm install --save request
# npm install --save request-promise

var institutes = require('request-promise');
var courses = require('request-promise'); 
institutes({
  "method":"GET", 
  "uri": "http://mqa.gov.mv/api/v1/institutes/local",
  "json": true,
  "headers": {
    "User-Agent": "Data Mining"
  }
}).then(function(response){

	for (i in response){
		courses({
	 		"method":"GET",
  			"uri": "http://mqa.gov.mv/api/v1/institutes/"+response[i].id+"/courses",
  			"json": true,
			"headers": {
    				"User-Agent": "Data Mining"
  			}		
		}).then(function(result){
			const fs = require('fs');
			fs.writeFileSync('courses.json', JSON.stringify(result)); 	
		})
	}
});

