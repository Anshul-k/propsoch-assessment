import React from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import properties from "../utils/mockupData";
import Chip from "@mui/material/Chip";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon for Leaflet maps
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const Detail = () => {
  const { id } = useParams();
  const property = properties.find((prop) => prop.id === parseInt(id));

  // If no property is found
  if (!property) {
    return (
      <>
        <Header />
        <div className="detail">
          <h2>Property Not Found</h2>
        </div>
        <Navbar />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="detail">
        {/* Property Image and Most Liked Chip */}
        <div className="property-image-container">
          <img
            src={property.images[0]}
            alt="property"
            className="property-image"
          />
          {property.isMostLiked && (
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
        </div>

        {/* Property Title, Location, and Price */}
        <div className="property-info-container">
          <div className="property-title-price">
            <h2>{property.name}</h2>
            <h3>{property?.details?.price}</h3>
          </div>
          <div className="property-location">
            {(property?.details?.sector || property?.details?.localArea) && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <PlaceRoundedIcon style={{ fontSize: "1.2rem" }} />
                <span>
                  {property?.details?.sector},{property?.details?.localArea}
                </span>
              </div>
            )}
            {property?.details?.emiAvailable && <span>EMI Available</span>}
          </div>
        </div>

        {/* Location Section with maps */}
        <div className="location-section">
          <h3>Location</h3>
          <div className="location-address">
            <div className="location-icon">
              <PlaceOutlinedIcon />
            </div>
            <span>{property?.details?.fullAddress}</span>
          </div>
          {/* Map section */}
          <div className="map-container">
            <MapContainer
              center={[
                property?.details?.mapLocation?.latitude,
                property?.details?.mapLocation?.longitude,
              ]}
              zoom={15}
              style={{ height: "15rem", width: "100%", borderRadius: "1rem" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[
                  property?.details?.mapLocation?.latitude,
                  property?.details?.mapLocation?.longitude,
                ]}
                icon={customIcon}
              >
                <Popup>{property.name}</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Property Amenities section */}
          <div className="location-tags">
            {Object.entries(property?.details?.nearbyBenefits).map(
              ([item, number], id) => (
                <span key={id}>
                  {number} {item}
                </span>
              )
            )}
          </div>
          <h3>Property Amenities</h3>
        </div>

        {/* Property Type section */}
        <div className="amenities-section">
          <div className="amenities">
            <span>{property?.details?.propertyType}</span>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Detail;
