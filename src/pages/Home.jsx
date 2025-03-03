import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsLetter from "../components/NewsLetter";
import "../styles/home.css";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState({});
  const [showMore, setShowMore] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  const categories = ["business", "technology", "health", "science", "sports"];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allArticles = [];
        // Fetch articles for each category
        for (let category of categories) {
          // const response = await axios.get(
          //   `https://newsapi.org/v2/everything?q=${category}&apiKey=${
          //     import.meta.env.VITE_NEWS_API_KEY
          //   }`
          const response = await axios.get(`https://newsapi.org/v2/everything?q=${category}&apiKey=7fc84dc6050041fb9083a9bebb461480`);

          const filtered_data = response.data.articles.filter((item) => {
            // Ensure each article has the required fields
            return item.author && item.title && item.description && item.url && item.urlToImage && item.publishedAt && item.content;
          });
          console.log(filtered_data);

          allArticles.push({ category, articles: filtered_data });
        }

        setArticles(allArticles);

        // Initialize visible articles and show more state for each category
        const initialVisible = {};
        const initialShowMore = {};
        categories.forEach((category) => {
          initialVisible[category] = 5; // Initially show 5 articles
          initialShowMore[category] = false; // Show More button is hidden by default
        });

        setVisibleArticles(initialVisible);
        setShowMore(initialShowMore);

        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchCategories();
  }, []);

  const toggleShowMore = (category) => {
    // Toggle Show More/Show Less for each category
    setShowMore((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));

    // Toggle the number of visible articles
    setVisibleArticles((prev) => ({
      ...prev,
      [category]: prev[category] === 5 ? 10 : 5,
    }));
  };

  return (
    <div>
      <h1>Top Headlines</h1>

      {/* Display spinner while loading */}
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div> {/* Spinner CSS class */}
        </div>
      ) : (
        articles.map((categoryData, idx) => (
          <div key={idx}>
            <h2 className="text-center text-md-start ms-md-5 my-md-3">{categoryData.category.charAt(0).toUpperCase() + categoryData.category.slice(1)}</h2>
            <div className="cards-container">
              {/* Map over articles for each category and display */}
              {categoryData.articles
                .slice(0, visibleArticles[categoryData.category]) // Limit articles based on visibility
                .map((article, index) => (
                  <NewsLetter article={article} key={index} />
                ))}
            </div>

            {/* Show More button to toggle the number of visible articles */}
            <div className="show-more-container">
              <button className="btn-show-more" onClick={() => toggleShowMore(categoryData.category)}>
                {showMore[categoryData.category] ? "Show Less" : "Show More"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
