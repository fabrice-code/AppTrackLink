var allLinks = [];

function checkLinks() {	
	allLinks.forEach(function(link) {
		chrome.history.getVisits({ "url" : link}, 
			function(visits) {	
				console.log('Process url history : ' + visits.length);	
				if(visits.length > 0) {
					$("#result-tbody").append('<tr>'+ 
						'<td>' + link + '</td>' +
						'<td style="color: green; font-weight: bold"> V </td>' +
						'</tr>');
				} else {
					$("#result-tbody").append('<tr>'+ 
						'<td>' + link + '</td>' +
						'<td style="color: red; font-weight: bold"> X </td>' +
						'</tr>');
				}
			});
	});	
}

chrome.extension.onRequest.addListener(function(links) {
	
	for (var index in links) {
		allLinks.push(links[index]);
	}
	allLinks.sort();  
	checkLinks();
});



chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {mode: "ReloadLink"}, function(response) {});
	});    
});


$("#reload").click(function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {mode: "ReloadLink"}, function(response) {});
	});   
});