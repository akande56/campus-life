import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FeatureListSection() {
  return (
    <div className='container m-3'>
        <div className="row">
            <div className="title text-center m-3 p-2">
                <h1>Features</h1>
                <p className="text-secondary">Access the benefits our platform</p>
            </div>
        <div className="col" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <img src="assets/alumni.jpg" alt="" className='img-fluid elevation-4 shadow-lg rounded p-3' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div className="col">
            
                <ul className='p-3' style={{fontFamily:'lato', fontSize:'20px', textAlign:'justify'}}>
                    <li>
                        <strong>Comprehensive Student Profiles:</strong> Students can create and maintain detailed profiles that include academic accomplishments, extracurricular activities, and personal achievements.
                    </li>
                    <li>
                        <strong>Achievement Documentation:</strong> The system allows students to record and showcase their achievements, such as awards, certifications, and noteworthy projects.
                    </li>
                
                    <li>
                        <strong>Interactive Networking:</strong> The platform promotes networking among students and faculty members, encouraging collaboration and communication within the campus community.
                    </li>
                    <li>
                        <strong>Seamless Connection with Peers:</strong> Students can connect with their peers, fostering a sense of community and providing opportunities for collaboration on projects and shared interests.
                    </li>
                
                    <li>
                        <strong>Data Privacy and Security:</strong> Robust security measures are implemented to protect sensitive student information, ensuring the confidentiality and privacy of user data.
                    </li>
            
                </ul>
            </div>
            
        </div>
    </div>

    
  );
}

export default FeatureListSection;
