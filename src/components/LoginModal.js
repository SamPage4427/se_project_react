import { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm.js";

function LoginModal({
  isOpen,
  onLogin,
  onClose,
  buttonText,
  altButtonText,
  altClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Login"
      onClose={onClose}
      onSubmit={handleSubmit}
      name="signin"
      buttonText={buttonText}
      altButtonText={altButtonText}
      handleAltClick={altClick}
    >
      <label>
        <h3 className="modal__label">Email*</h3>
        <input
          className="modal__input"
          id="email-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label>
        <h3 className="modal__label">Password*</h3>
        <input
          className="modal__input"
          id="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
