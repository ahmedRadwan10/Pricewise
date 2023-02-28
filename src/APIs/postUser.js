import {
  errorSignUpUser,
  startSignUpUser,
  successSignUpUser,
  startSignInUser,
  successSignInUser,
  errorSignInUser,
} from "../redux/slices/authSlice";

export async function signUpUser(dispatch, data) {
  dispatch(startSignUpUser());
  try {
    const respose = await fetch("http://localhost:9000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    dispatch(successSignUpUser(true));
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
