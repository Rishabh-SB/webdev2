import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import backgroundImage from './background-image.jpg';
import ShowRecipes from './ShowRecipes';
import SubmitRecipe from './SubmitRecipe';
import AboutUs from './AboutUs';
import FamousChefWebsites from './FamousChefWebsites';

const App = () => {
  return (
    <Router>
      <div className="container" style={{ backgroundImage: `url(${backgroundImage})` }}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show-recipes" element={<ShowRecipes />} />
          <Route path="/submit-recipe" element={<SubmitRecipe />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/famous-chef-websites" element={<FamousChefWebsites />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  return (
    <div>
      <div className="welcome-message">
          <h1>Welcome to our Recipe Blog</h1>
          <div className="button-container">
            <Link to="/show-recipes" className="recipe-button">Show Recipes</Link>
            <Link to="/submit-recipe" className="recipe-button">Submit Recipe</Link>
          </div>
          <div className='button-container'>
          <Link to="/about-us" className="about-us-button">About Us</Link>
          <Link to="/famous-chef-websites" className="about-us-button">More Websites!</Link>
          </div>
          
        </div>
    </div>
  );
};

export default App;
