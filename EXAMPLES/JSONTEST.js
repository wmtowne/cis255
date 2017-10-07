// ---------- AJAX CALL ----------
var req = new XMLHttpRequest(); // create an ajax request
var url = 'https://api.svsu.edu/courses?instructor=gpcorser';
req.onreadystatechange = function() {
	var readyStateDone = 4;
	var readyStatusSuccess = 200;
	if (this.readyState == readyStateDone && 
		this.status == readyStatusSuccess) {
		var jsonObj = JSON.parse(this.responseText);
		htmlTable(jsonObj);
	}
};
req.open('GET', url, true);
req.send();


// ========== FUNCTIONS ==========

// -----------------------------------------------------------
function htmlTable(jsonObj) { // insert data from json obj into html
	// See file, json.txt, for example of file structure
	replaceUndefined(jsonObj);
	displayHtmlTable(jsonObj, 'id01');
	console.log("Working")
}

// -----------------------------------------------------------
function displayHtmlTable (jsonObj, id) { // insert HTML table
	var out = '<table>';
	var fa = '<table>', wi = '<table>', sp = '<table>', su = '<table>';
	for(var i = 0; i < jsonObj.courses.length; i++) { // build HTML table
		out += htmlTableRow(jsonObj, i); // append next course to table
	}
	out += '</table>';
	document.getElementById(id).innerHTML = out; // display HTML table
}

// -----------------------------------------------------------
function htmlTableRow(jsonObj, i) { // return one row of HTML table
	return '<tr>' + 
		'<td>' + 
		jsonObj.courses[i].prefix + 
		'</td><br><td>' + 
		jsonObj.courses[i].courseNumber + 
		'</td><br><td>' + 
		jsonObj.courses[i].section +  ' ' + 
		'</td><br><td>' + 
		jsonObj.courses[i].meetingTimes[0].building +  
		jsonObj.courses[i].meetingTimes[0].room + ' ' + 
		'</td><br><td>' + 
		jsonObj.courses[i].meetingTimes[0].startTime + ' ' +
		'</td><br><td>' + 
		' (' + jsonObj.courses[i].term + ')' + 
		'</td><br></tr>';
}

// -----------------------------------------------------------
function replaceUndefined(jsonObj) { // return JSON object
	// replace undefined properties with strings for online courses 
	for(i = 0; i < jsonObj.courses.length; i++) {
		if (!jsonObj.courses[i].meetingTimes[0].building)
			jsonObj.courses[i].meetingTimes[0].building = 'ONLINE'; 
		if (!jsonObj.courses[i].meetingTimes[0].room)
			jsonObj.courses[i].meetingTimes[0].room = ''; 
		if (!jsonObj.courses[i].meetingTimes[0].startTime)
			jsonObj.courses[i].meetingTimes[0].startTime = 'ONLINE';
	}
}

// -----------------------------------------------------------
function semesterHeading(term) { // return string, ex: 'Fall 2017'
	// term: a string containing semester, ex: '17/FA'
	var year = '20' + term.substring(0,1); // ex: '2017'
	var semester = term.substring(3,4); // ex: 'FA'
	switch(semster) {
		case 'FA': semester = 'Fall'; break;
		case 'WI': semester = 'Winter'; break;
		case 'SP': semester = 'Spring'; break;
		case 'SU': semester = 'Summer'; break;
		default: semester = 'None'; break;
	}
	return semester + ' ' + year;
}

// -----------------------------------------------------------
function thisSemester() { // return string, ex: 'FA' (Fall)
	var d = new Date();
    var n = d.getMonth(); // ex: 0 (January), or 11 (December)
	var semester = '';
	semester = 'WI';
	if (n >= 4) semester = 'SP'; 
	if (n >= 6) semester = 'SU';
	if (n >= 8) semester = 'FA';
	return semester;
}

// -----------------------------------------------------------
function thisYear() { // return integer, ex: 2017
	var d = new Date();
    return d.getFullYear(); // ex: 2017
}






