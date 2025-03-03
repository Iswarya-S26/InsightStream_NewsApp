import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/footer.css"; // Import the footer styles

const Footer = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/search?query=${category}`);
  };

  return (
    <footer className="footer mt-5">
      <div className="footer-container container">
        <div className="footer-links mb-5 mt-3">
          {[
            "General",
            "Lifestyle",
            "Business",
            "Geo-Politics",
            "Technology",
            "Health",
            "Stock Markets",
            "Wars",
            "Science",
            "Fitness",
            "Exchanges",
            "Current Affairs",
          ].map((category, index) => (
            <button
              key={index}
              className="footer-link"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="footer-text">
          News World - &copy; 2025 - All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
