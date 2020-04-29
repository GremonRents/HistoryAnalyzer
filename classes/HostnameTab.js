class HostnameTab{

    constructor(){
        this.sessions = [];
        this.session = ["", ""];
    }

    startSession(){
        this.session[0] = new Date().toLocaleString();
    }

    endSession(){
        this.session[1] = new Date().toLocaleString();
        this.sessions.push(this.session);
        this.session = ["", ""];
    }




    
}