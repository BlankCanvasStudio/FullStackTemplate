import axios from "axios";
const API_URL = "http://backend.localhost";
class AuthService {
  login(username, password) {
    let config = {
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      } 
    }
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    return axios
      .post(API_URL + "/login", params, config)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
    window.location.reload();
  }
  register(username, pronouns, password) {
    return axios.post(API_URL + "/signup", {
      username,
      pronouns,
      password
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();
