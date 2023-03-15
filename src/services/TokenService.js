export default class TokenService {
    static get() {
        const user = localStorage.getItem('user');
        if (user) {
            const userObj = JSON.parse(user);
            return userObj.token;
        }
        throw new Error(`Can't get token`);
    }
}