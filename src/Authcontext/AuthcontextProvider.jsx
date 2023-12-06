import React, { useState, useEffect } from 'react';
import Authcontext from './Authcontext';
import { Auth } from "../firebase/Firebaseconfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthcontextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    signUp: (name, email, password) => {
      createUserWithEmailAndPassword(Auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          user.updateProfile({
            displayName: name
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    signIn: (email, password) => {
      signInWithEmailAndPassword(Auth, email, password)
        .then((userCredential) => {
          alert("signIN sucessfully ");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    signOut: () => {
      signOut(Auth)
        .then(() => {
          alert("signout sucessfully ");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  };

  return (
    <Authcontext.Provider value={value}>
      {children}
    </Authcontext.Provider>
  );
};

export default AuthcontextProvider;
