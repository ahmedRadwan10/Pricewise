import {
  errorSignUpUser,
  startSignUpUser,
  successSignUpUser,
  startSignInUser,
  successSignInUser,
  errorSignInUser,
  msg,
  startActivate,
  successActivate,
  errorActivate,
  errorSendResetLink,
  successSendResetLink,
  startSendResetLink,
  errorPasswordReset,
  startPasswordReset,
  successPasswordReset,
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
      dispatch(successSignUpUser(data));
    } else if (!respose.ok) {
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
    const respose = await fetch("http://127.0.0.1:8000/auth/jwt/create/", {
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
    dispatch(errorSignInUser(err.message));
  }
}

export async function verify(dispatch, uid, token) {
  dispatch(startActivate());
  try {
    const respose = await fetch(
      `http://127.0.0.1:8000/auth/users/activation/${uid}/${token}/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, token }),
      }
    );

    if (respose.ok) {
      dispatch(successActivate());
    } else if (!respose.ok) {
      dispatch(errorActivate());
    }
  } catch (err) {
    dispatch(errorActivate());
  }
}

export async function resendAct(dispatch, email) {
  try {
    const respose = await fetch(
      `http://127.0.0.1:8000/auth/users/resend_activation/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      }
    );
  } catch (err) {}
}

export async function sendResetLink(dispatch, email) {
  dispatch(startSendResetLink());
  try {
    const respose = await fetch(
      `http://127.0.0.1:8000/auth/users/reset_password/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      }
    );
    if (respose.ok) {
      dispatch(successSendResetLink());
    } else if (!respose.ok) {
      dispatch(errorSendResetLink());
    }
  } catch (err) {
    dispatch(errorSendResetLink());
  }
}

export async function passwordReset(dispatch, uid, token, new_password) {
  dispatch(startPasswordReset());
  try {
    const respose = await fetch(
      `http://127.0.0.1:8000/auth/users/reset_password_confirm/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, token, new_password }),
      }
    );
    if (respose.ok) {
      dispatch(successPasswordReset());
    } else if (!respose.ok) {
      const data = await respose.json();
      dispatch(errorPasswordReset(data));
    }
  } catch (err) {
    dispatch(errorPasswordReset());
  }
}
