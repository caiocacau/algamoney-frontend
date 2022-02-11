import api from "./api";
import TokenService from "./token.service";

class AuthService {

  login(username, password) {

    const params = new URLSearchParams();
    params.append('client', process.env.REACT_APP_CLIENT);
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', process.env.REACT_APP_GRANT_TYPE);

    return api
      // .post("/auth/signin", {
      // .post("/oauth/token", params, {withCredentials: true})
      .post("/oauth/token", params)
      .then(response => {
        //  console.log(response)
        if (response.data.access_token) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register(username, email, password) {
    return api.post("/auth/signup", {
      username,
      email,
      password
    });
  }
}

export default new AuthService();
