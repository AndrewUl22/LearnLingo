import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../AuthModal/AuthModal";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/teachers", label: "Teachers" },
];

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [authModal, setAuthModal] = useState({ isOpen: false, view: "login" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openAuthModal = (view) => {
    setAuthModal({ isOpen: true, view });
    setIsMenuOpen(false);
  };

  const closeAuthModal = () => setAuthModal((prev) => ({ ...prev, isOpen: false }));

  const handleLogout = async () => {
    await logout();
    toast.info("You have been logged out");
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.logo}>
          Learn<span className={styles.logoAccent}>Lingo</span>
        </NavLink>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                  }
                >
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`${styles.mobilePanel} ${isMenuOpen ? styles.mobilePanelOpen : ""}`}>
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/favorites"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                  }
                >
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>

          <div className={styles.actions}>
            {isAuthenticated ? (
              <div className={styles.userBlock}>
                <span className={styles.userName}>{user.displayName || user.email}</span>
                <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.loginButton}
                  onClick={() => openAuthModal("login")}
                >
                  Log In
                </button>
                <button
                  type="button"
                  className={styles.registerButton}
                  onClick={() => openAuthModal("register")}
                >
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModal.isOpen}
        initialView={authModal.view}
        onClose={closeAuthModal}
      />
    </header>
  );
};

export default Header;
