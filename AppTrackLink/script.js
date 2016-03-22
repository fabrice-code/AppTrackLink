function requestLinkPage(){
	var links = [].slice.apply(document.getElementsByTagName('a'));
	links = links.map(function(element) {
		var href = element.href;
		var hashIndex = href.indexOf('#');
		if (hashIndex >= 0) {
			href = href.substr(0, hashIndex);
		}
		return href;
	});

	links.sort();

	var kBadPrefix = 'javascript';
	for (var i = 0; i < links.length;) {
		console.log('Find url : ' + links[i]);
		if (((i > 0) && (links[i] == links[i - 1])) ||
			(links[i] == '') ||
			(kBadPrefix == links[i].toLowerCase().substr(0, kBadPrefix.length))) 
		{
			links.splice(i, 1);
		} else {
			++i;
		}
	}
	chrome.extension.sendRequest(links);
}

requestLinkPage();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(sender.tab ?
		"from a content script:" + sender.tab.url :
		"from the extension");
	if (request.mode == "ReloadLink")
	{
		requestLinkPage();
	}
});