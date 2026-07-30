import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

export function registerUser({ name, email, password }) {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (credential) =>
      updateProfile(credential.user, { displayName: name }).then(
        () => credential.user
      )
  );
}

export function loginUser({ email, password }) {
  return signInWithEmailAndPassword(auth, email, password).then(
    (credential) => credential.user
  );
}

export function logoutUser() {
  return signOut(auth);
}

export function subscribeToAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}
