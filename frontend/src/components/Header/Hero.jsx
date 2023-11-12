// HeroSection.js

import React from 'react';
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// Assuming you have styles for the components
import './HeroSection.css';


const HeroSection = () => {
  const backgroundImage = `${process.env.PUBLIC_URL}/assets/hero.jpg`;

  return (
    <section className="hero-section" style={{height:'100vh', width:'100%', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Text Centered Content */}
      <div className="hero-content text-center">
        <h1>Campus Life</h1>
        <p>Crafting Memories, Building a Future</p>
      
      <Button type="primary" size="large" icon={<UserAddOutlined />} className="cta-button">
        <Link to="/Registration">Sign Up</Link>
      </Button>
      </div>
    </section>
  );
};

export default HeroSection;
