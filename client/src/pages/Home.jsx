import React from 'react';
import { Search } from 'lucide-react';
import SearchSection from '../Components/SearchSection';
import TopInfluencer from '../Components/TopInfluencer';
import Features from '../Components/Features';
import Footer from '../Components/Footer';
import HeroSection from '../Components/HeroSection';


const Home = () => {
  return (
    <>
  <HeroSection/>
  <SearchSection/>
  <TopInfluencer/>
  <Features/>
  <Footer/>
  </>

  )
}

export default Home