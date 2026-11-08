import React from "react";
import { Link } from "react-router-dom";
import thumbnell from "../../assets/images/thumbnell.png";
import "./Landing.css";

const Landing = () => {
  return (
    // ADD THIS WRAPPER DIV
    <div className="landing-container">
      
      {/* LEFT SIDE: TEXT */}
      <div className="hero">
        <div className="intro-text">
          <h1>
            <span className="tagline1">Organize work and life</span> <br />
            <span className="tagline2">finally.</span>
          </h1>
          <p>
            type just anything into the task field and TodoList <br />
            one-of-its-kind natural language recognition will instantly fill your to-do list.
          </p>
          <div className="button-group">
            <Link className="btn red" to="/register">
              Register Now!
            </Link>
            <Link className="btn blue" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: IMAGE */}
      <div className="hero-image">
        <img src={thumbnell} alt="Thumbnail preview" />
      </div>

    </div>
  );
};

export default Landing;