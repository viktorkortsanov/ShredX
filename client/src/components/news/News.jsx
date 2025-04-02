import { useEffect, useState } from 'react';
import './news.css';
import { useTranslation } from 'react-i18next';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/everything?q=bodybuilding&apiKey=b2adafde08de475f99d1e8a617dfbce9');
        const data = await response.json();
        if (data.status === 'ok') {
          setArticles(data.articles.filter(article => article.urlToImage));
        } else {
          setError('Error fetching news data');
        }
      } catch (error) {
        setError("Error fetching news: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('bg-BG', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return <div className="news-loading">{t('common.loading')}.....</div>;
  }

  if (error) {
    return <div className="news-error">{error}</div>;
  }

  const duplicatedArticles = [...articles, ...articles];

  return (
    <div className="news-container">
      <div className="news-ticker">
        {duplicatedArticles.map((article, index) => (
          <div key={index} className="news-item">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="news-background-image"
              />
              <div className="news-content">
                <p className="news-title">{article.title}</p>
                <span className="news-source">
                  {article.source.name} • {formatDate(article.publishedAt)}
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;