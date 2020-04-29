let hostNames = new Object();
let previousHostname = "";


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status == "complete"){
        const url = new URL(tab.url);
        if(!hostNames[url.hostname])
            hostNames[url.hostname] = new HostnameTab();
        if(tab.active){
            if(previousHostname !== url.hostname){
                if(previousHostname)
                    hostNames[previousHostname].endSession();
                hostNames[url.hostname].startSession();
            }
            previousHostname = url.hostname;

        }
    }
});


chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) =>{
        //è gia stata caricata
        if(tab.status == "complete"){
            const url = new URL(tab.url);
            if(previousHostname !== url.hostname){
                if(previousHostname)
                    hostNames[previousHostname].endSession();
                hostNames[url.hostname].startSession();
            }
            previousHostname = url.hostname;
        }
    });
});



chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    if(removeInfo.isWindowClosing){
        chrome.tabs.get(tabId, (tab) =>{
            if(tab.active){
                const url = new URL(tab.url);
                hostNames[url.hostname].endSession();
            }
        });
    }
});




chrome.windows.onRemoved.addListener((windowId) =>{
    for(hostName in hostNames){
        let content = JSON.stringify(hostNames[hostName]);
        chrome.storage.local.set({[hostName]: content});
        //localStorage.setItem(hostName, content);
    }
});