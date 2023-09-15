import { auth } from './firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const signupAPI = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    console.log(userCredential);
  } catch (error) {
    console.log(error);
  }
};
