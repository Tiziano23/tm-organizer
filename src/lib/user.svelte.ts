import { readable } from "svelte/store";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "./firebase";

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  return await signInWithPopup(auth, provider);
};

export const logOut = async () => await signOut(auth);

function createUserStore() {
  return readable<User | null | undefined>(undefined, (set) => {
    return onAuthStateChanged(auth, (user) => {
      set(user);
    });
  });
}

export const user = createUserStore();
