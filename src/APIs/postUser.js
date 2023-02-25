import {
  errorPostUser,
  postUser,
  startPostUser,
  successPostUser,
} from "../redux/slices/authSlice";

export async function signUpUser(dispatch, data) {
  dispatch(startPostUser());
  try {
    const respose = await fetch("http://localhost:9000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    dispatch(successPostUser(true));
  } catch (err) {
    dispatch(errorPostUser(false));
  }
}
