import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FeatureSection() {
  return (
    <div className="row">
      <div className="title text-center m-3 p-2">
        <h1>Get to know Us</h1>
        <p className="text-secondary">Build your unity, smartly</p>
        </div>

      <div className="col">
        <h1 className='title p-4 '>Campus Life</h1>
        <p className="lead text-secondary p-4" style={{fontFamily:'lato', fontSize:'24px', textAlign:'justify'}}>
        An innovative campus life record system is envisioned as a comprehensive digital platform designed to empower students, enhance their academic journey, and foster a vibrant campus community.

     This multifaceted system serves as a dynamic hub where students can document their achievements, skills, and experiences while seamlessly connecting with peers and faculty members.
          
        </p>
      </div>
      <div className="col" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
       <img src="assets/campuslife.jpg" alt="" className='img-fluid elevation-3 rounded' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
    
  );
}

export default FeatureSection;
