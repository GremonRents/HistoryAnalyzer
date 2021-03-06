
chrome.tabs.onUpdated.addListener(updateHandler);

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, activeHandler);
});

chrome.windows.onRemoved.addListener((windowId) => {
    domains[previousDomain].endSession();
    for (hostName in domains) {
        domains[hostName].save(hostName);
    }
});

chrome.browserAction.setPopup({popup:''}); 

chrome.browserAction.onClicked.addListener(()=>{
    chrome.tabs.create({url:'pages/stats.html'});
});
