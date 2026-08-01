import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

const AuthModal = ({ isOpen, initialView = "login", onClose }) => {
  const [view, setView] = useState(initialView);

  const handleClose = () => {
    onClose();
    setTimeout(() => setView(initialView), 200);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} maxWidth="566px">
      {view === "login" ? (
        <LoginForm
          onSuccess={handleClose}
          onSwitchToRegister={() => setView("register")}
        />
      ) : (
        <RegisterForm
          onSuccess={handleClose}
          onSwitchToLogin={() => setView("login")}
        />
      )}
    </Modal>
  );
};

export default AuthModal;
