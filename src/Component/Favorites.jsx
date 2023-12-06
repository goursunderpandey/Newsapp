import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { Auth } from '../firebase/Firebaseconfig';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const db = getFirestore();
  const user = Auth.currentUser;

  useEffect(() => {
    if (user) {
      const favoritesRef = collection(db, `users/${user.uid}/favorites`);
      const favoritesQuery = query(favoritesRef);

      const unsubscribe = onSnapshot(favoritesQuery, (snapshot) => {
        const favoritesData = snapshot.docs.map((doc) => doc.data()); // Corrected line
        setFavorites(favoritesData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.title}>{favorite.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
