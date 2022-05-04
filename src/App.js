// Modules
import React, { useState, useEffect } from 'react';

// Components
import Search from './components/Search';
import Footer from './components/Footer';

const NYTIMES_URL = 'nytimes.com/';

const App = () => {
  const [articles, setArticles] = useState([])
  const [term, setTerm] = useState('technology')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `https://api.${NYTIMES_URL}svc/search/v2/articlesearch.json?q=${term}&api-key=UiwiQYGGt8IhJkWWInxwh3Pk4W5yflmZ`
        )
        const articles = await res.json()
        setArticles(articles.response.docs)
        setIsLoading(false)
      } catch (error) {
      console.error(error);
    }
  }
    fetchArticles()
  }, [term])

  return (
    <>
      <div className="showcase">
        <div className="overlay">
          <h1>Viewing articles about {term}</h1>
          <Search searchText={(text) => setTerm(text)} />
        </div>
      </div>

      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <section>
          {articles.map((article) => {
            const {
              abstract,
              headline: { main },
              byline: { original },
              lead_paragraph,
              web_url,
              _id,
              news_desk,
              multimedia
            } = article

            return (
              <article key={_id}>
                <img 
                  src={multimedia[0] && ('https://' + NYTIMES_URL + multimedia[0].url)} 
                  className="articleImage" 
                  alt= {news_desk} 
                />
                <h2>{main}</h2>
                <p>{abstract}</p>
                <p>{lead_paragraph}</p>

                <ul>
                  <li>{original}</li>
                </ul>
                <a href={web_url} target="_blank">Read full news article</a>
              </article>
            )
          })}
        </section>
        )}
    </>
  );
}

export default App;