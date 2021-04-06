import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const RightContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 1024px) {
    margin-top: 40px;
  }
`;

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const { control, handleSubmit, errors, reset } = useForm();
  const [userUsername, setUserUsername] = useState("");
  const [userConfirmed, setUsertConfirmed] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  async function signUp(data: FormValues) {
    const { username, email, password } = data;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      setUserUsername(username);
      reset({
        username: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.log({ err, data });
      setErrMessage(err.message);
    }
  }

  async function confirmUser(data: FormValues) {
    const { password } = data;
    try {
      await Auth.confirmSignUp(userUsername, password);
      reset({
        password: "",
      });
      setUsertConfirmed(true);
    } catch (err) {
      console.log({ err, data });
    }
  }

  async function resendCode() {
    try {
      await Auth.resendSignUp(userUsername);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
    }
  }

  if (userConfirmed === true) return <Redirect to="sign-in" />;

  if (userUsername) {
    return (
      <div>
        <p>
          Thank you, {userUsername} for signin up in Dark Auth. We sent a
          verification code to your email.
        </p>

        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <input
              onBlur={onBlur}
              onChange={(value) => onChange(value)}
              value={value}
              placeholder="Verification code"
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.code && <p className="error-message">Code is required</p>}

        <button onClick={handleSubmit(confirmUser)}>
          <p>Confirm your account</p>
        </button>
        <p className="button-text" onClick={() => resendCode}>
          {"< Resend code />"}
        </p>
      </div>
    );
  }

  return (
    <RightContainer>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <input
            onBlur={onBlur}
            onChange={(value) => onChange(value)}
            value={value}
            placeholder="Username"
          />
        )}
        name="username"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.username && <p className="error-message">Username is required</p>}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <input
            onBlur={onBlur}
            onChange={(value) => onChange(value)}
            value={value}
            placeholder="Email"
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.email && <p className="error-message">Email is required</p>}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <input
            type="Password"
            onBlur={onBlur}
            onChange={(value) => onChange(value)}
            value={value}
            placeholder="Password"
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.password && <p className="error-message">Password is required</p>}

      <button onClick={handleSubmit(signUp)}>
        <p>Sign up</p>
      </button>

      {errMessage && <p className="error-message">{errMessage}</p>}
    </RightContainer>
  );
};

export default SignUp;
