import React from "react";
import "../App.css";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="nav-item">
        <SearchIcon className="nav-icon" />
        <span>Explore</span>
      </Link>
      <div className="nav-item">
        <FavoriteBorderRoundedIcon className="nav-icon" />
        <span>Wishlists</span>
      </div>
      <div className="nav-item">
        <PlaceOutlinedIcon className="nav-icon" />
        <span>Show Map</span>
      </div>
      <div className="nav-item">
        <PersonOutlineRoundedIcon className="nav-icon" />
        <span>Login</span>
      </div>
    </div>
  );
};

export default Navbar;
