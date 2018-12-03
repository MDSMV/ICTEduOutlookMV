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
			for (c in result){
				result[c].institute_name = response[result[c].institute_id].name
			}
			const fs = require('fs');
			fs.writeFileSync('institute_courses.json', JSON.stringify(result)); 	
		})
	}
});

