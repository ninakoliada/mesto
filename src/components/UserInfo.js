export class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const name = this._name.textContent;
        const about = this._about.textContent;

        return { name, about };
    }

    setUserInfo = ({ name, about, avatar, _id }) => {
        if (name) {
            this._name.textContent = name;
        }

        if (about) {
            this._about.textContent = about;
        }

        if (avatar) {
            this._avatar.src = avatar;
        }
        
        if (_id) {
            this.id = _id;
        }
    }
}