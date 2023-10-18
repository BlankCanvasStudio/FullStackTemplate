import axios from "axios";

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
      .post("/api/auth/login", params, config)
      .then(response => {
        if (response.data.accessToken) {
          // localStorage.setItem("user", JSON.stringify(response.data));
          this.saveLoginResponse(response.data)
        }
        return response.data;
      });
  }
  saveLoginResponse(data) {
    localStorage.setItem("user", JSON.stringify(data))
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(email, username, pronouns, password, birthday, country, first_name, last_name, bio) {
    return axios.post("/api/auth/signup", {
      email:email,
      pronouns:pronouns,
      password:password,
      birthday:birthday,
      first_name:first_name,
      last_name:last_name, 
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  verifyLogin() {
    if(this.getCurrentUser()) { return true; }
    return false;
  }
  async verifyAdmin(failed_callback) {
    await axios({
      method: "post",
      url: "/api/auth/admin",
      data: {},
      headers: Object.assign(authHeader(), {"Content-Type": "application/json"}),
    }).then((response) => {
        if (response.data.admin === false) { failed_callback() }
    }).catch((err) => {
        console.log(err)
        failed_callback()
    })
  }
}
let tmp = new AuthService()
export default tmp;


export function authHeader() { // Specific to the Node & Express backend
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        // for Node.js Express back-end
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}

