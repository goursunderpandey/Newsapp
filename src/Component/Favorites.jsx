import React, { useContext } from 'react';
import Authcontext from '../Authcontext/Authcontext';

const Favorites = () => {
  const { favorites } = useContext(Authcontext);

  return (
    <div>
      <h2>Favorites</h2>
      <div className="row">
        {favorites.map((favorite) => (
          <div className="col-md-4" key={favorite.title}>
            <div className="card mb-4 shadow-sm">
              <img
                src={favorite.urlToImage}
                className="card-img-top"
                alt={favorite.title}
              />
              <div className="card-body">
                <h5 className="card-title">{favorite.title}</h5>
                <p className="card-text">{favorite.description}</p>
                <p>{favorite.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
