import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBAqLY77J8_Pvxq8qRO8GuAbxGRIHMVwrA',
  authDomain: 'netflix-clone-b849c.firebaseapp.com',
  projectId: 'netflix-clone-b849c',
  storageBucket: 'netflix-clone-b849c.appspot.com',
  messagingSenderId: '269290264658',
  appId: '1:269290264658:web:557bd49a816cdfc4e3278b',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
