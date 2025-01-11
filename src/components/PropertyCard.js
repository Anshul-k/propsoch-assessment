import React, { useState } from "react";
import Slider from "react-slick";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "../App.css";
import { Link } from "react-router-dom";

const PropertyCard = ({ propertyData }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Toogle the Wishlist icon
  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
  };

  // Function to get colors based on the ratings
  const getRatingColor = (rating) => {
    if (rating < 2) return "red";
    if (rating >= 2 && rating <= 4) return "#FFA500";
    return "green";
  };

  // Function to format views(Add commas [,] properly)
  const formatViews = (views) =>
    views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Slick Carousal Settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "-10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ display: "flex", gap: "1px", padding: 0, width: "50%" }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          backgroundColor: "lightGray",
        }}
      ></div>
    ),
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <div className="property-card">
      {/* Carousel Section */}
      <div className="carousel-container">
        <Slider {...carouselSettings}>
          {propertyData.images.map((image, index) => (
            <Link to={`/detail/${propertyData.id}`} key={index}>
              <img
                src={image}
                alt={`property-img-${index}`}
                className="carousel-image"
              />
            </Link>
          ))}
        </Slider>

        {/* Most Liked Chip */}
        {propertyData.isMostLiked && (
          <div className="property-card-chip-container">
            <Chip
              label="Most Liked"
              style={{
                backgroundColor: "white",
                color: "black",
                fontSize: "0.7rem",
              }}
            />
          </div>
        )}

        <div className="wishlist-icon-container" onClick={handleWishlistToggle}>
          <FavoriteIcon style={{ color: isInWishlist ? "red" : "gray" }} />
        </div>
      </div>

      {/* Property Viewed and Ratings section*/}
      <div className="property-card-info">
        <span style={{ color: "gray", display: "flex", alignItems: "center" }}>
          <RemoveRedEyeIcon style={{ fontSize: "16px", marginRight: "4px" }} />
          {formatViews(propertyData.views)}
        </span>
        <div
          className="rating-container"
          style={{
            color: getRatingColor(propertyData.rating),
          }}
        >
          <StarRoundedIcon style={{ fontSize: "16px" }} />
          <span>{propertyData.rating}</span>
        </div>
      </div>

      {/* Property name and details section */}
      <div className="property-card-details">
        <Link to={`/detail/${propertyData.id}`} className="location">
          {propertyData.name}, {propertyData.location}
        </Link>
        <div className="date-range">{propertyData.dateRange}</div>
      </div>
    </div>
  );
};

export default PropertyCard;
