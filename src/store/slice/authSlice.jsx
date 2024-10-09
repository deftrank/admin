// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { DEFT_RANK_API } from "../../service/apiConstant";

import api from "../../service/index";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
const slice = createSlice({
  name: "auth",
  initialState: {
    loginData: null,
    isLoading: false,
    loginUserData: "",
    isOpenSideBar: false,
    isVerified: false,
  },
  reducers: {
    apiFetching: (state) => {
      state.isLoading = true;
    },

    loginSuccess: (state, action) => {
      state.loginData = action.payload.data;
      state.isLoading = false;
    },
    loginFailed: (state, action) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
    handleSideBarSuccess: (state, action) => {
      state.isOpenSideBar = action.payload;
    },
    handlePersonalFormSuccess: (state, action) => {
      state.registerForm = action.payload;
      console.log(state.registerForm);
    },
    loginDataSuccess: (state, action) => {
      state.loginUserData = action.payload?.data;
    },
    identitySuccess: (state, action) => {
      state.isVerified = action.payload?.is_verified;
    },
  },
});

export default slice.reducer;

/**********************ACTIONS************************************************ */
const {
  loginSuccess,
  loginFailed,
  apiFetching,
  loginDataSuccess,
  handleSideBarSuccess,
  identitySuccess,
  // handlePersonalFormSuccess,
} = slice.actions;

// login
export const login = (data, navigate) => async (dispatch) => {
  dispatch(apiFetching());

  try {
    const response = await api.post(DEFT_RANK_API.auth.login, data);
    const result = response?.data;

    if (result?.status) {
      secureLocalStorage.setItem(
        import.meta.env.VITE_TOKEN_STORAGE_KEY,
        result.token
      );
      navigate("/");
    } else {
      // Handle unsuccessful login, like showing an error message
      // toast.error(result?.message);
    }
  } catch (error) {
    console.error("Login failed:", error.message);
    // Handle errors, e.g. show a toast message
    // toast.error(error.message);
  }
};

export const forgetPassword = (data, navigate) => async (dispatch) => {
  dispatch(apiFetching());

  try {
    const response = await api.post(DEFT_RANK_API.auth.login, data);
    const result = response?.data;

    if (result?.status) {
      toast.error(error.message);
    } else {
      toast.error(error.message);
    }
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};

// otp verify
export const otpVerify = (data, navigate) => async (dispatch) => {
  dispatch(apiFetching());
  try {
    await api.post(DEFT_RANK_API.auth.otpVerify, data).then((response) => {
      let result = response.data;
      if (result.status) {
        secureLocalStorage.setItem(
          import.meta.env.VITE_TOKEN_STORAGE_KEY,
          result.data.jwt_token
        );
        secureLocalStorage.setItem(
          import.meta.env.REACT_APP_USER_STORAGE_KEY,
          JSON.stringify(result.data)
        );
        toast.success(result?.message);
        dispatch(loginSuccess(result.data));
        if (result?.data?.is_verified && result?.data?.jwt_token != null) {
          navigate("/");
        } else {
          navigate("/register", { replace: true });
        }
      } else {
        dispatch(loginFailed(response.data));
        toast.error(response.data.message);
      }
    });
  } catch (e) {
    return toast.error(e.message);
  }
};
export const generateOtp = (data) => async (dispatch) => {
  dispatch(apiFetching());
  try {
    await api.post(DEFT_RANK_API.auth.generateOTp, data).then((response) => {
      let result = response.data;
      if (result.status) {
        toast.success(result?.message);
      } else {
        // dispatch(loginFailed(response.data));
        toast.error(response.data.message);
      }
    });
  } catch (e) {
    return toast.error(e.message);
  }
};

export const setIdentifier = (data, navigate) => async (dispatch) => {
  dispatch(apiFetching());

  try {
    await api.post(DEFT_RANK_API.auth.setIdentifier, data).then((response) => {
      let result = response.data;
      if (result.status) {
        toast.success(result?.message);
        dispatch(identitySuccess(result));
      } else {
        // dispatch(loginFailed(response.data));
        toast.error(response.data.message);
      }
    });
  } catch (e) {
    return toast.error(e.message);
  }
};

//  here is basic details function for registration
export const register = (data, navigate) => async (dispatch) => {
  dispatch(apiFetching());
  try {
    await api.post(DEFT_RANK_API.auth.register, data).then((response) => {
      let result = response.data;
      if (result.status) {
        if (result.status) {
          secureLocalStorage.setItem(
            import.meta.env.VITE_TOKEN_STORAGE_KEY,
            result.token
          );
          secureLocalStorage.setItem(
            import.meta.env.REACT_APP_USER_STORAGE_KEY,
            JSON.stringify(result)
          );
          toast.success(result?.message);
          dispatch(loginSuccess(result));
          navigate("/student-onboarding");
        } else {
          dispatch(loginFailed(response.data));
          toast.error(response.data.message);
        }
      } else {
        dispatch(loginFailed(response.data));
        toast.error(response.data.message);
      }
    });
  } catch (e) {
    return toast.error(e.message);
  }
};

// personal details form
export const personalDetailsForm = (data) => async (dispatch) => {
  handlePersonalFormSuccess;
  dispatch(handlePersonalFormSuccess(data));
};
//  openClose side bar
export const handleSideBar = (data) => async (dispatch) => {
  dispatch(handleSideBarSuccess(data));
};
