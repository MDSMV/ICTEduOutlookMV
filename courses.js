// before running the script
// npm install --save request
// npm install --save request-promise

var institutes = require('request-promise');
var courses = require('request-promise'); 
var ins_cou = new Object();
institutes({
  "method":"GET", 
  "uri": "http://mqa.gov.mv/api/v1/institutes/local",
  "json": true,
  "headers": {
    "User-Agent": "Data Mining"
  }
}).then(function(response){

	for (i in response){
		// ins_cou.institute = i.name;
		console.log(response[i].name);	
		courses({
	 		"method":"GET",
  			"uri": "http://mqa.gov.mv/api/v1/institutes/"+response[i].id+"/courses",
  			"json": true,
			"headers": {
    				"User-Agent": "Data Mining"
  			}		
		}).then(function(result){
			const fs = require('fs');
			fs.writeFileSync(i+'courses.json', JSON.stringify(result)); 	
		})
	}
});

