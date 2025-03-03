import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NewsLetter from "../components/NewsLetter";
import Spinner from "../components/Spinner"; // Import the Spinner component
import "../styles/categorynews.css"; // Optional, if you need additional styles

const CategoryNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [articlesPerPage] = useState(10); // Number of articles per page
  const location = useLocation();

  const category = location.pathname.substring(1); // Extracts category from URL (e.g. '/business' => 'business')

  // Reset currentPage to 1 whenever the category changes
  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when the category changes
  }, [category]); // Dependency on category, so it runs when category changes

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${category}&apiKey=${
            import.meta.env.VITE_NEWS_API_KEY
          }`
        );

        const filtered_data = response.data.articles.filter((item) => {
          // Check if all required fields are available and not null or undefined
          return (
            item.author &&
            item.title &&
            item.description &&
            item.url &&
            item.urlToImage &&
            item.publishedAt &&
            item.content &&
            item.source && // Check if source data exists
            item.source.name && // Ensure source name is not null or undefined
            item.urlToImage !== null &&
            item.urlToImage !== undefined // Ensure image URL is available
          );
        });

        setArticles(filtered_data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategoryNews();
    }
  }, [category]); // Run the effect whenever category changes

  // Pagination Logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(articles.length / articlesPerPage); // Calculate total pages

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="my-5">
      <h1 className=" page-title">
        {category.charAt(0).toUpperCase() + category.slice(1)} News
      </h1>

      {/* Show the spinner if loading is true */}
      {loading ? (
        <Spinner /> // Render the Spinner component when loading
      ) : (
        <div className="cards-container">
          {currentArticles.map((article, index) => (
            <NewsLetter article={article} key={index} />
          ))}
        </div>
      )}

      {/* Pagination Buttons */}
      {!loading && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export default CategoryNews;
