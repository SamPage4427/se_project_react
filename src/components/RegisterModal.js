import { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm.js";

function RegisterModal({
  isOpen,
  onSignUp,
  onClose,
  buttonText,
  altButtonText,
  altClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarURL, setAvatarUrl] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarUrlChange = (e) => setAvatarUrl(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    onSignUp({ email, password, name, avatar: avatarURL });
  }

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatarUrl("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign up"
      onClose={onClose}
      onSubmit={handleSubmit}
      name="signup"
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
      <label>
        <h3 className="modal__label">Name*</h3>
        <input
          className="modal__input"
          id="name-input"
          type="text"
          minLength={2}
          maxLength={30}
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label>
        <h3 className="modal__label">Avatar Image*</h3>
        <input
          className="modal__input"
          type="url"
          placeholder="Avatar URL"
          value={avatarURL}
          onChange={handleAvatarUrlChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
