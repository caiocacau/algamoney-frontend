import axiosInstance from "./api";
import TokenService from "./token.service";
import { refreshToken } from "../actions/auth";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        // config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      const params = new URLSearchParams();
      params.append('grant_type', process.env.REACT_APP_REFRESH_TOKEN);

      // if (originalConfig.url !== "/auth/signin" && err.response) {
      if (originalConfig.url !== "/oauth/token" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {

            TokenService.updateLocalAccessToken(null);

            // const rs = await axiosInstance.post("/auth/refreshtoken", {
            // refreshToken: TokenService.getLocalRefreshToken(),
            // });
            const rs = await axiosInstance.post("/oauth/token", params, {
              headers: {
                'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
              },
            }
            );

            const { access_token: accessToken } = rs.data;

            dispatch(refreshToken(accessToken));
            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;