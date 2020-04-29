class Domain {
    constructor() {
        this.sessions = [];
        this.session = ["", ""];
    }

    startSession() {
        this.session[0] = new Date().toLocaleString();
    }

    endSession() {
        this.session[1] = new Date().toLocaleString();
        this.sessions.push(this.session);
        this.session = ["", ""];
    }

    save(domain) {
        let content = JSON.stringify(this.sessions);
        chrome.storage.local.set({ [domain]: content });
    }
}