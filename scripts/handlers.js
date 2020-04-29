let domains = new Object();
let previousDomain = "";

let check = (current) => {
    if (previousDomain != current) {
        if (previousDomain)
            domains[previousDomain].endSession();
        domains[current].startSession();
    }
    previousDomain = current;
}

let activeHandler = (tab) => {
    //è gia stata caricata
    if (tab.status == "complete") {
        const url = new URL(tab.url);
        check(url.hostname);
    }
};

let updateHandler = (tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete") {
        const url = new URL(tab.url);
        if (!domains[url.hostname])
            domains[url.hostname] = new Domain();
        if (tab.active) {
            check(url.hostname);
        }
    }
}