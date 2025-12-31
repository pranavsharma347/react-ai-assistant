import { useGoogleLogin } from "@react-oauth/google";
// utils/auth.
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

// export const logoutUser = () => {
//   localStorage.removeItem("access_token");
//   localStorage.removeItem("refresh_token");
// };
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};




export const logoutUser = async () => {
  try {
    const access = getAccessToken();
    const refresh = getRefreshToken();

    await axios.post(
      "https://geniehub.duckdns.org/user/logout/",
      { refresh }, // 👈 body
      {
        headers: {
          Authorization: `Bearer ${access}`, // 👈 REQUIRED
        },
      }
    );
  } catch (error) {
    console.error("Logout Api Failed", error);
  } finally {
    // 🔥 Always clear tokens (even if API fails)
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_email");
  }
};





export const handleGoogleLogin = async (credentialResponse) => {
  try {
    // console.log("Google Token:", credentialResponse.credential);

    const res = await axios.post(
      "https://geniehub.duckdns.org/user/google-login/",
      {
        token: credentialResponse.credential,
      }
    );
    console.log(res)

    localStorage.setItem("access_token", res.data.tokens.access);
    localStorage.setItem("refresh_token", res.data.tokens.refresh);
    localStorage.setItem("user_email", res.data.user.email);


    console.log("Google login success");
    window.location.href = "/";
  } catch (err) {
    console.log("err", err);
    console.error("Google login failed", err.response?.data || err);
  }
};


