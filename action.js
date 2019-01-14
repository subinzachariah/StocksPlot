
var serverEntries;
var loadDataFromDb = () => {

	var client;
	var data;

	var url_action="http://localhost:8080/Test_Server_Program/TestServlet";
	if(window.XMLHttpRequest)
	{
	    client=new XMLHttpRequest();
	}
	else
	{
	    client=new ActiveXObject("Microsoft.XMLHTTP");
	}
	client.onreadystatechange=function()
	{
	    if (client.readyState==4 && client.status==200)
	    {
	    	var entries = JSON.parse(client.responseText);
	    	serverEntries = entries;
	         
	    }
	};
	client.open("GET",url_action,true);
	client.send(data);

}

var getData = () => {
	if(!serverEntries) {
		loadDataFromDb();
		return loadFromCahce();
	}
	else {
		return loadFromCahce();
	}
};
	
function loadFromCahce() {
	var datapoints = {};
	var bseDataPoints = [];
	var djDataPoints = [];
	var dropdown = document.getElementById("duration");
	var value = dropdown.options[dropdown.selectedIndex].value;
	
	var selectedItem = document.getElementById("index");
	var selectedIndexValue = selectedItem.options[selectedItem.selectedIndex].value;
	
	var referenceDate = getReferenceDate(value);
	
	var entries = serverEntries;

	var dateEntries = Object.keys(entries); 
	dateEntries.sort();
	
	for(i=0 ; i< dateEntries.length; i++) {
		
		if(new Date(dateEntries[i]) > referenceDate ){
		
			selectedIndexValue !== 'BSEonly'  && djDataPoints.push({ x: new Date(dateEntries[i]), y: entries[dateEntries[i]][0] })
			selectedIndexValue !== 'DowJonesonly' && bseDataPoints.push({ x: new Date(dateEntries[i]), y: entries[dateEntries[i]][1] })
		}
	}
	datapoints['djDataPoints'] = djDataPoints;
	datapoints['bseDataPoints'] = bseDataPoints;
	return datapoints;	
}
function getReferenceDate(value){
	var currentDate = new Date();
	switch (value) {
		case '5Years':
			var oldYear = currentDate.getFullYear() - 5;
			return currentDate.setFullYear(oldYear);
			break;
		case '1Year':
			var oldYear = currentDate.getFullYear() - 1;
			return currentDate.setFullYear(oldYear);
			break;
		case '6Months':
			var oldMonth = currentDate.getMonth() - 6;
			return currentDate.setMonth(oldMonth);
		case '3Months':
			var oldMonth = currentDate.getMonth() - 3;
			return currentDate.setMonth(oldMonth);
		case '1Month':
			var oldMonth = currentDate.getMonth() - 1;
			return currentDate.setMonth(oldMonth);
	}
	
}
