import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, faHeart } from '@fortawesome/free-solid-svg-icons';
import Authcontext from '../Authcontext/Authcontext';
import ArticleDetail from './Newsdetiles';

const Home = () => {
  const [news, setNews] = useState([]);
  const [visibleNews, setVisibleNews] = useState(6);
  const [isGridView, setIsGridView] = useState(false);
  const { user ,newsData ,setSelectedArticle , selectedArticle } = useContext(Authcontext);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate(); 

  const getData = async () => {
    // Assuming you are fetching data asynchronously from the context
    const fetchedData = await newsData;
    setNews(fetchedData);
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

  const handleFavoriteToggle = (newsItem) => {
    const isFavorite = favorites.some((fav) => fav.title === newsItem.title);

    if (isFavorite) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.title !== newsItem.title)
      );
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, newsItem]);
    }
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    navigate('/news');
  };

  const handleArticleDetailClose = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="container mt-5">
      {!user ? (
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <p className="lead">Please log in to view the content.</p>
            <NavLink className="btn btn-primary" to="/login">
              Login
            </NavLink>
          </div>
        </div>
      ) : (
        <>
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
                onClick={() => handleArticleClick(newsItem)}
                style={{ cursor: 'pointer' }}
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
                    {user && (
                      <button
                        className="btn btn-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavoriteToggle(newsItem);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          style={{
                            color: favorites.some((fav) => newsItem.title === fav.title)
                              ? 'red'
                              : 'gray',
                          }}
                        />
                      </button>
                    )}
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
          {selectedArticle && (
            <ArticleDetail
              article={selectedArticle}
              onClose={handleArticleDetailClose}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
