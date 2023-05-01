import {
  errorSignUpUser,
  startSignUpUser,
  successSignUpUser,
  startSignInUser,
  successSignInUser,
  errorSignInUser,
  msg,
} from "../redux/slices/authSlice";

export async function signUpUser(dispatch, data) {
  dispatch(startSignUpUser());
  try {
    const respose = await fetch("http://127.0.0.1:8000/auth/users/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (respose.ok) {
      dispatch(successSignUpUser(true));
    } else {
      const data = await respose.json();
      dispatch(errorSignUpUser(data));
    }
  } catch (err) {
    dispatch(errorSignUpUser(false));
  }
}

export async function signInUser(dispatch, loginData) {
  dispatch(startSignInUser());
  try {
    const respose = await fetch("https://dummyjson.com/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    if (respose.ok) {
      const data = await respose.json();
      dispatch(successSignInUser(data));
    } else {
      throw new Error("Password Or Email Incorrect");
    }
  } catch (err) {
    dispatch(errorSignUpUser(err.message));
  }
}
