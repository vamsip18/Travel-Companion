// import React, { useState } from 'react';
// import './Destinations.scss';
// import Portfolio from '../TopRestaurants/Restaurants.jsx';
// import axios from 'axios';

// function Destinations() {
//   const [location, setLocation] = useState('');
//   const [date, setDate] = useState('');
//   const [distance, setDistance] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   // Fetch location suggestions from Nominatim API
//   const fetchSuggestions = async (input) => {
//     if (!input) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${input}&format=json&addressdetails=1&limit=5`
//       );
//       const data = await response.json();

//       if (data) {
//         const locations = data
//           .map((item) => {
//             const { address } = item;
//             // Use the most relevant short name (e.g., city or town)
//             return (
//               address.city ||
//               address.town ||
//               address.village ||
//               address.hamlet ||
//               item.display_name.split(',')[0] // Fallback to first part of display_name
//             );
//           })
//           .filter((name, index, self) => name && self.indexOf(name) === index); // Remove duplicates

//         setSuggestions(locations);
//       } else {
//         setSuggestions([]);
//       }
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//       setSuggestions([]);
//     }
//   };

//   const handleLocationChange = (e) => {
//     const input = e.target.value;
//     setLocation(input);
//     fetchSuggestions(input);
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   console.log({ location, date, distance });
//   // };
//   const [restaurants, setRestaurants] = useState([]);

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=1&limit=1`
//     );
//     const data = await response.json();

//     if (data && data.length > 0) {
//       const { lat, lon } = data[0];
//       const latitude = parseFloat(lat);
//       const longitude = parseFloat(lon);

//       const serverResponse = await axios.get("http://localhost:8000/restaurants", {
//         params: {
//           latitude,
//           longitude,
//           budget: distance || 2,
//         },
//       });

//       setRestaurants(serverResponse.data); // Store restaurants in state
//     } else {
//       console.error("No coordinates found for the entered location.");
//     }
//   } catch (error) {
//     console.error("Error during geocoding or fetching restaurants:", error);
//   }
// };


//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
  
//   //   try {
//   //     // Geocode the entered location using Nominatim
//   //     const response = await fetch(
//   //       `https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=1&limit=1`
//   //     );
//   //     const data = await response.json();
//   //     console.log(data);
//   //     if (data && data.length > 0) {
//   //       const { lat, lon } = data[0]; // Extract latitude and longitude
//   //       const latitude = parseFloat(lat);
//   //       const longitude = parseFloat(lon);
  
//   //       // Send coordinates and budget to the backend
//   //       const serverResponse = await axios.get("http://localhost:8000/restaurants", {
//   //         params: {
//   //           latitude,
//   //           longitude,
//   //           budget: distance || 2, // Default budget to 2 if not selected
//   //         },
//   //       });
  
//   //       console.log("Restaurants data:", serverResponse.data);
//   //     } else {
//   //       console.error("No coordinates found for the entered location.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error during geocoding or fetching restaurants:", error);
//   //   }
//   // };
  

//   const handleSuggestionClick = (suggestion) => {
//     setLocation(suggestion);
//     setSuggestions([]);
//   };

//   return (
//     <div className="destinations">
//       <div className="secTitle">
//         <span className="highlightText">EXPLORE NOW</span>
//         <h3>Find Your Dream Destination</h3>
//       </div>
//       <div className="container">
//         <form onSubmit={handleSubmit} className="form">
//           {/* Location Input */}
//           <div className="form-group">
//             <label htmlFor="location">Location</label>
//             <input
//               type="text"
//               id="location"
//               value={location}
//               onChange={handleLocationChange}
//               placeholder="Enter destination"
//               required
//             />
//             {suggestions.length > 0 && (
//               <ul className="suggestions">
//                 {suggestions.map((suggestion, index) => (
//                   <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
//                     {suggestion}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Date Input */}
//           <div className="form-group">
//             <label htmlFor="date">Travel Date (Optional)</label>
//             <input
//               type="date"
//               id="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>

//           {/* Distance Dropdown */}
//           <div className="form-group">
//             <label htmlFor="distance">Distance (Optional)</label>
//             <select
//               id="distance"
//               value={distance}
//               onChange={(e) => setDistance(e.target.value)}
//             >
//               <option value="">Select distance</option>
//               <option value="short">Short Distance</option>
//               <option value="medium">Medium Distance</option>
//               <option value="long">Long Distance</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <button type="submit">Submit</button>
//         </form>

//         <div className="restaurant-list">
//         {restaurants.map((restaurant, index) => (
//         <div key={index} className="restaurant-card">
//         <h4>{restaurant.name}</h4>
//         <p>{restaurant.location.formatted_address}</p>
//         <img src={restaurant.photo} alt={restaurant.name} />
//       </div>
//   ))}
// </div>


        
//       </div>
//     </div>
//   );
// }

// export default Destinations;




// import React, { useState } from 'react';
// import './Destinations.scss';

// function Destinations() {
//   const [location, setLocation] = useState('');
//   const [date, setDate] = useState('');
//   const [distance, setDistance] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [restaurants, setRestaurants] = useState([]);
//   const [error, setError] = useState('');

//   // Fetch location suggestions from Nominatim API
//   const fetchSuggestions = async (input) => {
//     if (!input) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${input}&format=json&addressdetails=1&limit=5`
//       );
//       const data = await response.json();

//       if (data) {
//         const locations = data.map((item) => ({
//           name: item.display_name,
//           latitude: item.lat,
//           longitude: item.lon,
//         }));
//         setSuggestions(locations);
//       } else {
//         setSuggestions([]);
//       }
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//       setSuggestions([]);
//     }
//   };

//   const handleLocationChange = (e) => {
//     const input = e.target.value;
//     setLocation(input);
//     fetchSuggestions(input);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setLocation(suggestion.name);
//     setSuggestions([]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Fetch the latitude and longitude of the location
//     const selectedSuggestion = suggestions.find(
//       (s) => s.name.toLowerCase() === location.toLowerCase()
//     );

//     if (!selectedSuggestion) {
//       setError('Please select a valid location from the suggestions.');
//       return;
//     }

//     setError('');

//     try {
//       const { latitude, longitude } = selectedSuggestion;

//       // Fetch restaurants using the server
//       const response = await fetch(
//         `http://localhost:8000/restaurants?latitude=${latitude}&longitude=${longitude}&budget=2`
//       );
//       const data = await response.json();

//       setRestaurants(data);
//     } catch (error) {
//       console.error('Error fetching restaurants:', error);
//       setError('Failed to fetch restaurants. Please try again later.');
//     }
//   };

//   return (
//     <div className="destinations">
//       <div className="secTitle">
//         <span className="highlightText">EXPLORE NOW</span>
//         <h3>Find Your Dream Destination</h3>
//       </div>
//       <div className="container">
//         <form onSubmit={handleSubmit} className="form">
//           {/* Location Input */}
//           <div className="form-group">
//             <label htmlFor="location">Location</label>
//             <input
//               type="text"
//               id="location"
//               value={location}
//               onChange={handleLocationChange}
//               placeholder="Enter destination"
//               required
//             />
//             {suggestions.length > 0 && (
//               <ul className="suggestions">
//                 {suggestions.map((suggestion, index) => (
//                   <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
//                     {suggestion.name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Date Input */}
//           <div className="form-group">
//             <label htmlFor="date">Travel Date (Optional)</label>
//             <input
//               type="date"
//               id="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>

//           {/* Distance Dropdown */}
//           <div className="form-group">
//             <label htmlFor="distance">Distance (Optional)</label>
//             <select
//               id="distance"
//               value={distance}
//               onChange={(e) => setDistance(e.target.value)}
//             >
//               <option value="">Select distance</option>
//               <option value="short">Short Distance</option>
//               <option value="medium">Medium Distance</option>
//               <option value="long">Long Distance</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <button type="submit">Submit</button>
//         </form>

//         {/* Display fetched restaurants */}
//         <div>
//           {restaurants.length > 0 && (
//             <div className="restaurant-list">
//               <h3>Top Restaurants:</h3>
//               <ul>
//                 {restaurants.map((restaurant, index) => (
//                   <li key={index}>
//                     <h4>{restaurant.name}</h4>
//                     <p>{restaurant.location.formatted_address}</p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Error message */}
//         {error && <p className="error-message">{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default Destinations;




import React, { useState } from 'react';
import './Destinations.scss';
import axios from 'axios';

function Destinations() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${input}&format=json&addressdetails=1&limit=5`
      );
      const data = await response.json();

      const locations = data.map((item) => {
        const { address } = item;
        return (
          address.city ||
          address.town ||
          address.village ||
          address.hamlet ||
          item.display_name.split(',')[0]
        );
      }).filter((name, index, self) => name && self.indexOf(name) === index);

      setSuggestions(locations);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleLocationChange = (e) => {
    const input = e.target.value;
    setLocation(input);
    fetchSuggestions(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=1&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);

        const serverResponse = await axios.get('http://localhost:8000/restaurants', {
          params: {
            latitude,
            longitude,
            budget: distance || 2,
          },
        });

        setRestaurants(serverResponse.data);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="destinations">
      <div className="secTitle">
        <span className="highlightText">EXPLORE NOW</span>
        <h3>Find Your Dream Destination</h3>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter destination"
              required
            />
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="date">Travel Date (Optional)</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="distance">Distance (Optional)</label>
            <select
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            >
              <option value="">Select distance</option>
              <option value="short">Short Distance</option>
              <option value="medium">Medium Distance</option>
              <option value="long">Long Distance</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>

        {<div className="restaurant-list">
  <h1>Top Restaurants For You</h1>
  {restaurants.length > 0 ? (
    <div className="grid">
      {restaurants.map((restaurant, index) => (
        <div
          key={index}
          className="restaurant-card"
          onClick={() =>
            window.open(
              `https://www.google.com/maps?q=${restaurant.geocodes.main.latitude},${restaurant.geocodes.main.longitude}`,
              '_blank'
            )
          }
        >
          <img
            src={restaurant.photo || 'https://via.placeholder.com/250x150.png?text=No+Image'}
            alt={restaurant.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/250x150.png?text=No+Image';
            }}
          />
          <h3>{restaurant.name}</h3>
          <p>{restaurant.location.formatted_address}</p>
        </div>
      ))}
    </div>
  ) : (
    <p>No restaurants found for this location.</p>
  )}
</div>
/* <div className="restaurant-list">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="restaurant-card">
              <h4>{restaurant.name}</h4>
              <p>{restaurant.location.formatted_address}</p>
              <img
                src={restaurant.photo || 'https://via.placeholder.com/250x150.png?text=No+Image'}
                alt={restaurant.name}
              />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Destinations;




// import React, { useState } from "react";
// import axios from "axios";

// function Destinations() {
//   const [location, setLocation] = useState("");
//   const [date, setDate] = useState("");
//   const [distance, setDistance] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [restaurants, setRestaurants] = useState([]);
//   const [error, setError] = useState("");

//   const fetchSuggestions = async (input) => {
//     if (!input) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${input}&format=json&addressdetails=1&limit=5`
//       );
//       const data = await response.json();

//       if (data) {
//         const locations = data
//           .map((item) => {
//             const { address } = item;
//             return (
//               address.city ||
//               address.town ||
//               address.village ||
//               address.hamlet ||
//               item.display_name.split(",")[0]
//             );
//           })
//           .filter((name, index, self) => name && self.indexOf(name) === index);

//         setSuggestions(locations);
//       } else {
//         setSuggestions([]);
//       }
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//       setSuggestions([]);
//     }
//   };

//   const handleLocationChange = (e) => {
//     const input = e.target.value;
//     setLocation(input);
//     fetchSuggestions(input);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=1&limit=1`
//       );
//       const data = await response.json();

//       if (data && data.length > 0) {
//         const { lat, lon } = data[0];
//         const latitude = parseFloat(lat);
//         const longitude = parseFloat(lon);

//         const serverResponse = await axios.get(
//           "http://localhost:8000/restaurants",
//           {
//             params: {
//               latitude,
//               longitude,
//               budget: distance || 2,
//             },
//           }
//         );

//         setRestaurants(serverResponse.data);
//         setError("");
//       } else {
//         setError("No coordinates found for the entered location.");
//       }
//     } catch (error) {
//       console.error("Error during geocoding or fetching restaurants:", error);
//       setError("Failed to fetch restaurants. Please try again.");
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setLocation(suggestion);
//     setSuggestions([]);
//   };

//   const navigateToGoogleMaps = (latitude, longitude) => {
//     window.open(
//       `https://www.google.com/maps?q=${latitude},${longitude}`,
//       "_blank"
//     );
//   };

//   return (
//     <div className="destinations">
//       <div className="secTitle">
//         <span className="highlightText">EXPLORE NOW</span>
//         <h3>Find Your Dream Destination</h3>
//       </div>
//       <div className="container">
//         <form onSubmit={handleSubmit} className="form">
//           <div className="form-group">
//             <label htmlFor="location">Location</label>
//             <input
//               type="text"
//               id="location"
//               value={location}
//               onChange={handleLocationChange}
//               placeholder="Enter destination"
//               required
//             />
//             {suggestions.length > 0 && (
//               <ul className="suggestions">
//                 {suggestions.map((suggestion, index) => (
//                   <li
//                     key={index}
//                     onClick={() => handleSuggestionClick(suggestion)}
//                   >
//                     {suggestion}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="date">Travel Date (Optional)</label>
//             <input
//               type="date"
//               id="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="distance">Distance (Optional)</label>
//             <select
//               id="distance"
//               value={distance}
//               onChange={(e) => setDistance(e.target.value)}
//             >
//               <option value="">Select distance</option>
//               <option value="short">Short Distance</option>
//               <option value="medium">Medium Distance</option>
//               <option value="long">Long Distance</option>
//             </select>
//           </div>

//           <button type="submit">Submit</button>
//         </form>
//       </div>

//       {/* Display Restaurants */}
//       <div style={{ padding: "20px" }}>
//         <h1 style={{ textAlign: "center" }}>Top Restaurants For You</h1>
//         {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "20px",
//             justifyContent: "center",
//           }}
//         >
//           {restaurants.map((restaurant, index) => (
//             <div
//               key={index}
//               style={{
//                 border: "1px solid #ccc",
//                 borderRadius: "10px",
//                 padding: "10px",
//                 width: "250px",
//                 textAlign: "center",
//                 cursor: "pointer",
//               }}
//               onClick={() =>
//                 navigateToGoogleMaps(
//                   restaurant.geocodes.main.latitude,
//                   restaurant.geocodes.main.longitude
//                 )
//               }
//             >
//               <img
//                 src={
//                   restaurant.photo ||
//                   "https://via.placeholder.com/250x150.png?text=No+Image"
//                 }
//                 alt={restaurant.name}
//                 style={{
//                   width: "100%",
//                   borderRadius: "10px",
//                   height: "150px",
//                 }}
//                 onError={(e) => {
//                   e.target.src =
//                     "https://via.placeholder.com/250x150.png?text=No+Image";
//                 }}
//               />
//               <h3>{restaurant.name}</h3>
//               <p>{restaurant.location.formatted_address}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Destinations;
