import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import NewsLetter from "../components/NewsLetter"; // Assuming your newsletter component
import { useInView } from "react-intersection-observer";
import Spinner from "../components/Spinner";
import FooterSpinner from "../components/FooterSpinner";

const fetchArticles = async ({ pageParam = 1, searchQuery }) => {
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${searchQuery}&page=${pageParam}&pageSize=10&apiKey=${
      import.meta.env.VITE_NEWS_API_KEY
    }`
  );
  return response.data.articles; // Returning just the articles array
};

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);

  // Use react-query for infinite loading of search results
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchArticles", searchQuery],
    queryFn: ({ pageParam = 1 }) => fetchArticles({ pageParam, searchQuery }),
    getNextPageParam: (lastPage, pages) =>
      lastPage?.length === 10 ? pages.length + 1 : undefined,
    enabled: !!searchQuery, // Only run the query if there is a search query
  });

  //react inter section observer
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  });

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <p>Error loading search results</p>;

  return (
    <div className="p-5">
      <h1 className="mt-5 text-start">Results for '{searchQuery}'</h1>

      {/* Display articles */}
      <div className="cards-container">
        {data?.pages?.map((page, index) => (
          <React.Fragment key={index}>
            {page?.map((article, idx) => (
              <NewsLetter article={article} key={idx} />
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Show loading message while fetching more results */}
      {/* {isFetchingNextPage && <FooterSpinner />} */}

      {/* Load more button */}
      {/* {hasNextPage && !isFetchingNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          Load more
        </button>
      )} */}

      {/* inview */}
      <div ref={ref}>
        {isFetchingNextPage && hasNextPage ? <FooterSpinner /> : ""}
      </div>

      {/* No more results */}
      {!hasNextPage && <p className="text-center">No more results</p>}
    </div>
  );
};

export default SearchResults;
