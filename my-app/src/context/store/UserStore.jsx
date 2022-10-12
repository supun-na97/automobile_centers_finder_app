import { makeAutoObservable } from "mobx";

export default class UserStore {

    isLogged = false;
    type = "";

    constructor(rootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this);

        this.isLogged = window.localStorage.getItem("isLogged") === "true";
        this.type = window.localStorage.getItem("type") || "";
    }

    authenticate(username, type) {
        this.isLogged = true;
        this.type = type;
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("type", type);
        window.localStorage.setItem("isLogged", "true");
        window.location.reload(false);
    }

    logout() {
        window.localStorage.clear();
        this.isLogged = false;
        window.location.reload(false);
    }

}
