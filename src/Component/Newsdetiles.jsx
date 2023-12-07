import React, { useContext } from 'react';
import Authcontext from '../Authcontext/Authcontext';

const Newsdetiles = () => {
  const { selectedArticle } = useContext(Authcontext);

  if (!selectedArticle) {
    // Handle the case when there is no selected article
    return null;
  }

  return (
    <div className="article-detail">
      <div className="article-detail-header">
      </div>
      <div className="article-detail-content">
        <h1>{selectedArticle.title}</h1>
        {selectedArticle.urlToImage && (
          <img src={selectedArticle.urlToImage} alt={selectedArticle.title} />
        )}
        <p>{selectedArticle.content}</p>
         <a href={selectedArticle.url} > read more </a>
      </div>
    </div>
  );
};

export default Newsdetiles;
