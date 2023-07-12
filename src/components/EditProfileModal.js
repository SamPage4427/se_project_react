import { useState, useEffect, useContext } from "react";
import ModalWithForm from "./ModalWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfileModal({ isOpen, onEditProfile, onClose, buttonText }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatarURL, setAvatarUrl] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatarUrl(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile({ name, avatar: avatarURL });
  }

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setAvatarUrl(currentUser.avatar);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Edit Profile"
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit-profile"
      buttonText={buttonText}
    >
      <label>
        <h3 className="modal__label">Name*</h3>
        <input
          className="modal__input"
          type="text"
          minLength={2}
          maxLength={30}
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label>
        <h3 className="modal__label">Avatar*</h3>
        <input
          className="modal__input"
          type="url"
          placeholder="Avatar URL"
          onChange={handleAvatarChange}
          value={avatarURL}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
