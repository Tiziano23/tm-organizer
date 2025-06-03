import { onDestroy } from "svelte";

import {
  onIdTokenChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

import { sharedState, stateClosure } from "./state.svelte";
import { auth, firestore } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const loginWithGoogle = async () => {
  let provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  return await signInWithPopup(auth, provider);
};

export const logOut = async () => await signOut(auth);

export const useUser = () => sharedState("user", userState, {});

const userState = () => {
  const user = stateClosure<App.User>({ uid: null });

  const unsub = onIdTokenChanged(auth, (_user: User | null) => {
    if (!_user) {
      user.value = { uid: null };
    } else {
      user.value = {
        uid: _user.uid,
        fullName: _user.displayName,
        profilePhotoURL: _user.photoURL,
      };
    }
  });
  onDestroy(unsub);

  return user;
};

// export async function isOwner(
//   eventId: string,
//   groupId: string,
//   userId: string
// ) {
//   const d = await getDoc(doc(firestore, `groups/${groupId}/events/${eventId}`));
//   return d.get("createdBy") == userId;
// }
