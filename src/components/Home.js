import React from "react";
import NavBar from "./NavBar";
import CardContent from "./CardContent";
import Footer from "./Footer";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="app__card">
        <CardContent />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
