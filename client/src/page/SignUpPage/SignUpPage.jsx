import "./SignUpPage.scss";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors({});
    let formIsValid = true;
    const errors = {};
    if (!event.target.email.value) {
      formIsValid = false;
      errors["email"] = "You must enter an email address";
    }
    if (!event.target.username.value) {
      formIsValid = false;
      errors["username"] = "You must enter a username";
    }
    if (!event.target.password.value) {
      formIsValid = false;
      errors["password"] = "You must enter a password";
    }
    if (!event.target.confirmPassword.value) {
      formIsValid = false;
      errors["confirmPassword"] = "You must confirm your password";
    }
    if (event.target.password.value !== event.target.confirmPassword.value) {
      formIsValid = false;
      errors["passwordMatch"] = "Passwords don't match, please try again";
    }
    if (!formIsValid) {
      return setFormErrors(errors);
    }
    localStorage.setItem(
      "userData",
      JSON.stringify({
        id: uuidv4(),
        username: event.target.username.value,
        accountCreated: new Date(),
        email: event.target.email.value,
        password: event.target.password.value,
      })
    );
    event.target.reset();
    setSignUpSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <main>
      <div className="signup__wrapper">
        <h1 className="signup__title">SIGN UP</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label className="form__label" htmlFor="email">
            Email address:
          </label>
          <input className="form__input" type="email" id="email" name="email" />
          <p className="form__error">{formErrors.email}</p>
          <label className="form__label" htmlFor="username">
            Username:
          </label>
          <input
            className="form__input"
            type="text"
            id="username"
            name="username"
          />
          <p className="form__error">{formErrors.username}</p>
          <label className="form__label" htmlFor="password">
            Password:
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            name="password"
          />
          <p className="form__error">{formErrors.password}</p>
          <label className="form__label" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          />
          <p className="form__error">{formErrors.confirmPassword}</p>
          <p className="form__error">{formErrors.passwordMatch}</p>
          <button className="form__button" type="submit">
            Join whY
          </button>
        </form>
        <p
          className={`signup__success
              ${signUpSuccess ? "signup__success--true" : ""}`}>
          Success!
        </p>
      </div>
    </main>
  );
}
