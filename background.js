/*chrome.history.onVisited.addListener(function(result) {
    console.log(result.visitCount);
});*/

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    console.log(tab.url);
});



chrome.tabs.onActivated.addListener(function(activeInfo){
    console.log(activeInfo.tabId);
});