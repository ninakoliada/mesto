export class UserInfo {
    constructor({ nameSelector, professionSelector }) {
        this._name = document.querySelector(nameSelector);
        this._profession = document.querySelector(professionSelector);

    }

    getUserInfo() {
        const name = this._name.textContent;
        const profession = this._profession.textContent;

        return { name, profession };
    }

    setUserInfo({ name, profession }) {
        this._name.textContent = name;
        this._profession.textContent = profession;
    }
}