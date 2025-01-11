import React, { useState, useEffect, useCallback } from "react";
import PropertyCard from "../components/PropertyCard";
import "../App.css";
import properties from "../utils/mockupData";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Home = () => {
  const [visibleProperties, setVisibleProperties] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 6;

  // Load the initial set of properties
  useEffect(() => {
    setVisibleProperties(properties.slice(0, itemsPerPage));
  }, []);

  // Function to load more properties
  const loadMore = useCallback(() => {
    const nextPageStart = visibleProperties.length;
    const nextPageEnd = nextPageStart + itemsPerPage;

    if (nextPageStart >= properties.length) {
      setHasMore(false);
      return;
    }

    setVisibleProperties((prev) => [
      ...prev,
      ...properties.slice(nextPageStart, nextPageEnd),
    ]);
  }, [visibleProperties.length]);

  // Handling of the scroll
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      loadMore();
    }
  }, [loadMore]);

  // Scrolling listener useEffect
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleProperties, handleScroll]);

  return (
    <>
      <Header />
      <div className="home">
        {visibleProperties.map((property) => (
          <PropertyCard key={property.id} propertyData={property} />
        ))}
      </div>
      {!hasMore && (
        <div className="no-properties">
          <p>No more properties to show</p>
        </div>
      )}
      <Navbar />
    </>
  );
};

export default Home;
