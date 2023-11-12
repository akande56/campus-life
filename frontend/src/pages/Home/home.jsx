import React from 'react';
import {Container} from 'react-bootstrap';
import HeroSection from '../../components/Header/Hero';
import FeatureSection from '../../components/Feature/feature';
import FeatureListSection from '../../components/FeeatureList/featurelist';

//home page
function HomePage() {
  return (
    <Container fluid>
        <HeroSection/>
        <FeatureSection/>
        <FeatureListSection/>


    </Container>
  )
}

export default HomePage;