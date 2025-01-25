// import './App.css';
// import Navbar from './Components/Navbar/Navbar';
// import Home from './Components/Home/Home';
// import Middle from './Components/Middle/Middle';
// import Destinations from './Components/Destinations/Destinations';
// import TopRestaurants from './Components/TopRestaurants/Restaurants';
// import { useState } from 'react';

// function App() {
//   const [selectedLocation, setSelectedLocation] = useState(''); // State to track the selected location

//   return (
//     <div>
//       <Navbar />
//       <Home />
//       <Middle />
//       {/* Pass setSelectedLocation to Destinations */}
//       <Destinations onLocationSelect={setSelectedLocation} />
//       {/* Pass selectedLocation to TopRestaurants */}
//       <Restaurants location={selectedLocation} />
//       <Footer/>
//     </div>
//   );
// }

// export default App;


import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Middle from './Components/Middle/Middle';
import Destinations from './Components/Destinations/Destinations';

import Reviews from './Components/Reviews/Reviews';
import Questions from './Components/Questions/Questions';
import Subscribe from './Components/Subscribe/Subscribe';
import Footer from './Components/Footer/Footer';
// import TopRestaurants from './Components/TopRestaurants/Restaurants';

function App() {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Middle/>
      <Destinations/>
      {/* <TopRestaurants/> */}
      {/* 
      {/*
      <Reviews/>
      <Questions/>
      <Subscribe/>
      <Footer/>*/}
    </div>
  )
}

export default App
