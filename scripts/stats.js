chrome.storage.local.get((items) =>{
    document.getElementById("json").textContent = JSON.stringify(items, null, "\t");
});