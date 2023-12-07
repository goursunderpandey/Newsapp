import React, { useState, useEffect } from 'react';
import Authcontext from './Authcontext';
import { Auth } from "../firebase/Firebaseconfig";
import axios from 'axios';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthcontextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged((user) => {
      setUser(user);
    });
   
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2a2b8eb5b2e74194a7d60cbff09919b7'
      );
      setNewsData(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  },[])
  const value = {
    user,
    newsData,
    selectedArticle,
    setSelectedArticle,
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
