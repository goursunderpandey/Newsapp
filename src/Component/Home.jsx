// Import necessary dependencies
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, faHeart } from '@fortawesome/free-solid-svg-icons';
import Authcontext from '../Authcontext/Authcontext';

const Home = () => {
  const [news, setNews] = useState([]);
  const [visibleNews, setVisibleNews] = useState(6);
  const [isGridView, setIsGridView] = useState(false);
  const { user } = useContext(Authcontext);
  const [favorites, setFavorites] = useState([]);
 

  const getData = async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2a2b8eb5b2e74194a7d60cbff09919b7'
      );

      localStorage.setItem('cachedNews', JSON.stringify(response.data.articles));
      setNews(response.data.articles);
    } catch (error) {
      console.error(error);

      const cachedData = localStorage.getItem('cachedNews');
      if (cachedData) {
        setNews(JSON.parse(cachedData));
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleReadMore = () => {
    setVisibleNews((prevVisibleNews) => prevVisibleNews + 6);
  };

  const handleToggleView = () => {
    setIsGridView((prevIsGridView) => !prevIsGridView);
  };

  const handleFavoriteToggle = () => {
   
  }


  return (
    !user ? (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <p className="lead">Please log in to view the content.</p>
            <NavLink className="btn btn-primary" to="/login">Login</NavLink>
          </div>
        </div>
      </div>
    ) : (
      <>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 mb-3 text-right">
              <button className="btn btn-primary-outline " onClick={handleToggleView}>
                {isGridView ? (
                  <FontAwesomeIcon icon={faToggleOn} style={{ width: '50px', height: '50px' }} />
                ) : (
                  <FontAwesomeIcon icon={faToggleOff} style={{ width: '50px', height: '50px' }} />
                )}
              </button>
            </div>
          </div>
          <div className={`row ${isGridView ? 'justify-content-center' : ''}`}>
            {news.slice(0, visibleNews).map((newsItem) => (
              <div
                className={`${isGridView ? 'col-md-4 mb-4' : 'col-md-12 mb-4'}`}
                key={newsItem.title}
              >
                <div className={`card ${isGridView ? 'h-100' : ''}`}>
                  <div className="position-relative">
                    {newsItem.urlToImage && (
                      <img
                        src={newsItem.urlToImage}
                        className={`card-img-top ${isGridView ? '' : 'w-100'}`}
                        alt={newsItem.title}
                      />
                    )}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{newsItem.title}</h5>
                    <p className={`card-text ${isGridView ? 'text-truncate' : ''}`}>
                      {newsItem.description}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Published At: {newsItem.publishedAt}</small>
                    </p>
                    <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                      Read more
                    </a>
                    {user ? (<>
                      <button
                        className="btn btn-link"
                        onClick={() => handleFavoriteToggle(newsItem)}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          style={{
                            color: favorites.some((fav) => newsItem.title === newsItem.title) ? 'red' : 'gray',
                          }}
                        />
                      </button>

                    </>) : null}


                  </div>
                </div>
              </div>
            ))}
          </div>
          {visibleNews < news.length && (
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleReadMore}>
                Read More
              </button>
            </div>
          )}
        </div>
      </>
    )
  );
};

export default Home;
