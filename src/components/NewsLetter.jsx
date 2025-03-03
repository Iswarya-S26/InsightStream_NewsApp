import React from "react";
import "../styles/newsletter.css";
import { formatDate } from "../utils/formatDate";
import { truncateText } from "../utils/truncateText";

const NewsLetter = ({ article }) => {
  if (!article) return null; // Prevent rendering if article is undefined

  const { title, description, urlToImage, url, author, publishedAt, source } =
    article;

  return (
    <div className="my-3">
      <div className="card newsletter-component">
        {/* Source Badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">
            {source?.name || "Unknown Source"}
          </span>
        </div>

        {/* News Image */}
        {urlToImage ? (
          <img src={urlToImage} className="card-img-top" alt="News Thumbnail" />
        ) : (
          <img
            src="https://via.placeholder.com/150"
            className="card-img-top"
            alt="Placeholder"
          />
        )}

        <div className="card-body">
          <h5 className="card-title">{truncateText(title, 20)}</h5>
          <p className="card-text">{truncateText(description, 50)}</p>
          <p
            className="card-text"
            style={{ height: "20px", marginBottom: "30px" }}
          >
            <small className="text-muted">
              By {author || "Unknown"} on {formatDate(publishedAt)}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={url}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
