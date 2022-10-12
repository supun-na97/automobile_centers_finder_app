import UserStore from "./UserStore";
import {makeAutoObservable} from "mobx";

class RootStore {

    userStore = UserStore;

    constructor() {
        this.userStore = new UserStore(this);
        makeAutoObservable(this);
    }

}

export default RootStore;
