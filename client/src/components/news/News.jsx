import { useEffect, useState } from 'react';
import './news.css';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/everything?q=bodybuilding&apiKey=b2adafde08de475f99d1e8a617dfbce9');
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Грешка при извличане на новини:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-ticker-container">
      <div className="news-ticker">
        {articles.filter(article => article.urlToImage).map((article, index) => (
          <div key={index} className="news-item">
            <img src={article.urlToImage} alt={article.title} />
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <p>{article.title}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
