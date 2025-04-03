class TokenUtilsClass {
  private key: string;
  constructor() {
    this.key = "peer-interviewer-accessToken ";
  }
  setToken(token: string) {
    window.localStorage.setItem(this.key, token);
  }
  getToken() {
    return window.localStorage.getItem(this.key);
  }
  removeToken() {
    window.localStorage.removeItem(this.key);
  }
}
const TokenUtils = new TokenUtilsClass();
export default TokenUtils;
