import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from '../assets/images.png';
import { FaShoppingCart } from "react-icons/fa";

export const Navbar = ({ cartItems, setIsCartOpen }) => {
  return (
    <div className="navbar">
      
      <img className="logo" src={logo} />
      
      <div className="links">
        <Link to="/"> Home </Link>
        <Link to="/"> Categories </Link>
        <Link to="/"> About Us </Link>
      </div>
      
      <div className="cartbutton">
        <button className="cart-button" onClick={() => setIsCartOpen(true)}> <FaShoppingCart /> ({cartItems.length})</button>
      </div>
      
    </div> 
  );
};
