// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
//   const budget = 50; // Example budget

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ latitude, longitude });

//         axios
//           .get("http://localhost:5000/restaurants", {
//             params: { latitude, longitude, budget },
//           })
//           .then((response) => {
//             setRestaurants(response.data);
//           })
//           .catch((error) => {
//             console.error("Error fetching restaurants:", error);
//           });
//       },
//       (error) => console.error("Geolocation error:", error)
//     );
//   }, [budget]);

//   const navigateToGoogleMaps = (lat, lng) => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
//     window.open(url, "_blank");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 style={{ textAlign: "center" }}>Top Restaurants For You</h1>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
//         {restaurants.map((restaurant, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               padding: "10px",
//               width: "250px",
//               textAlign: "center",
//               cursor: "pointer",
//             }}
//             onClick={() => navigateToGoogleMaps(restaurant.location.lat, restaurant.location.lng)}
//           >
//             <img
//               src={`https://via.placeholder.com/250x150.png?text=${restaurant.name}`}
//               alt={restaurant.name}
//               style={{ width: "100%", borderRadius: "10px" }}
//             />
//             <h3>{restaurant.name}</h3>
//             <p>{restaurant.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TopRestaurants = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
//   const budget = 2; // Budget level (1=low, 4=high)
  
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ latitude, longitude });

//         axios
//           .get("http://localhost:5000/restaurants", {
//             params: {
//               latitude,
//               longitude,
//               budget,
//             },
//           })
//           .then((response) => {
//             setRestaurants(response.data);
//           })
//           .catch((error) => {
//             console.error("Error fetching restaurants:", error);
//           });
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
//         // Fallback location
//       }
//       // const latitude = 40.7128; // Example latitude (New York)
//       //   const longitude = -74.0060; // Example longitude (New York)
//       //   setUserLocation({ latitude, longitude });
//       //   restaurants(latitude, longitude);
//     );
//   }, [budget]);

//   const navigateToGoogleMaps = (lat, lng) => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
//     window.open(url, "_blank");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Top Restaurants For You</h1>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {restaurants.map((restaurant, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               padding: "10px",
//               width: "250px",
//               textAlign: "center",
//               cursor: "pointer",
//             }}
//             onClick={() =>
//               navigateToGoogleMaps(
//                 restaurant.geocodes.main.latitude,
//                 restaurant.geocodes.main.longitude
//               )
//             }
//           >
//             <img
//               src={`https://via.placeholder.com/250x150.png?text=${restaurant.name}`}
//               alt={restaurant.name}
//               style={{ width: "100%", borderRadius: "10px" }}
//             />
//             <h3>{restaurant.name}</h3>
//             <p>{restaurant.location.formatted_address}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopRestaurants;


import React, { useEffect, useState } from "react";
import axios from "axios";

const TopRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState("");
  const budget = 2; // Budget level (1=low, 4=high)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        axios
          .get("http://localhost:8000/restaurants", {
            params: {
              latitude,
              longitude,
              budget,
            },
          })
          .then((response) => {
            setRestaurants(response.data);
          })
          .catch((error) => {
            console.error("Error fetching restaurants:", error);
            // setError("Failed to fetch restaurant data. Please try again later.");
          });
      },
      (geolocationError) => {
        // console.error("Geolocation error:", geolocationError);
        // setError("Unable to fetch your location. Using fallback location.");

        // Fallback location (e.g., New York City)
        const fallbackLatitude = 40.7128;
        const fallbackLongitude = -74.0060;
        // Fallback location (e.g., New Delhi)
        // const fallbackLatitude = 28.7041;
       
        // const fallbackLongitude = 77.1025;

        // Fallback location (e.g., vizag)
        // 17.6868° N, 83.2185° E
        // const fallbackLatitude = 17.6868;
       
        // const fallbackLongitude = 83.2185;
        setUserLocation({ latitude: fallbackLatitude, longitude: fallbackLongitude });

        axios
          .get("http://localhost:8000/restaurants", {
            params: {
              latitude: fallbackLatitude,
              longitude: fallbackLongitude,
              budget,
            },
          })
          .then((response) => {
            setRestaurants(response.data);
          })
          .catch((error) => {
            console.error("Error fetching fallback restaurants:", error);
            // setError("Failed to fetch restaurant data for the fallback location.");
          });
      }
    );
  }, [budget]);

  const navigateToGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Top Restaurants For You</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              width: "250px",
              textAlign: "center",

              
              cursor: "pointer",
            }}
            onClick={() =>
              navigateToGoogleMaps(
                restaurant.geocodes.main.latitude,
                restaurant.geocodes.main.longitude
              )
            }
          >
            <img
              src={restaurant.photo || "https://via.placeholder.com/250x150.png?text=No+Image"}
              alt={restaurant.name}
              style={{ width: "100%", borderRadius: "10px" ,height:"150px"}}
              onError={(e) => {
                // Fallback image if the provided URL fails to load
                e.target.src = "https://via.placeholder.com/250x150.png?text=No+Image";
              }}
            />
            <h3>{restaurant.name}</h3>
            <p>{restaurant.location.formatted_address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRestaurants;



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TopRestaurants = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
//   const [error, setError] = useState("");
//   const budget = 2; // Budget level (1=low, 4=high)

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ latitude, longitude });

//         axios
//           .get("http://localhost:8000/restaurants", {
//             params: {
//               latitude,
//               longitude,
//               budget,
//             },
//           })
//           .then((response) => {
//             setRestaurants(response.data);
//           })
//           .catch((error) => {
//             console.error("Error fetching restaurants:", error);
//             // setError("Failed to fetch restaurant data. Please try again later.");
//           });
//       },
//       (geolocationError) => {
//         // console.error("Geolocation error:", geolocationError);
//         // setError("Unable to fetch your location. Using fallback location.");

//         // Fallback location (e.g., New York City)
//         const fallbackLatitude = 40.7128;
//         const fallbackLongitude = -74.0060;
//         // Fallback location (e.g., New Delhi)
//         // const fallbackLatitude = 28.7041;
       
//         // const fallbackLongitude = 77.1025;

//         // Fallback location (e.g., vizag)
//         // 17.6868° N, 83.2185° E
//         // const fallbackLatitude = 17.6868;
       
//         // const fallbackLongitude = 83.2185;
//         setUserLocation({ latitude: fallbackLatitude, longitude: fallbackLongitude });

//         axios
//           .get("http://localhost:8000/restaurants", {
//             params: {
//               latitude: fallbackLatitude,
//               longitude: fallbackLongitude,
//               budget,
//             },
//           })
//           .then((response) => {
//             setRestaurants(response.data);
//           })
//           .catch((error) => {
//             console.error("Error fetching fallback restaurants:", error);
//             // setError("Failed to fetch restaurant data for the fallback location.");
//           });
//       }
//     );
//   }, [budget]);

//   const navigateToGoogleMaps = (lat, lng) => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
//     window.open(url, "_blank");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 style={{ textAlign: "center" }}>Top Restaurants For You</h1>
//       {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
//         {restaurants.map((restaurant, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               padding: "10px",
//               width: "250px",
//               textAlign: "center",

              
//               cursor: "pointer",
//             }}
//             onClick={() =>
//               navigateToGoogleMaps(
//                 restaurant.geocodes.main.latitude,
//                 restaurant.geocodes.main.longitude
//               )
//             }
//           >
//             <img
//               src={restaurant.photo || "https://via.placeholder.com/250x150.png?text=No+Image"}
//               alt={restaurant.name}
//               style={{ width: "100%", borderRadius: "10px" ,height:"150px"}}
//               onError={(e) => {
//                 // Fallback image if the provided URL fails to load
//                 e.target.src = "https://via.placeholder.com/250x150.png?text=No+Image";
//               }}
//             />
//             <h3>{restaurant.name}</h3>
//             <p>{restaurant.location.formatted_address}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopRestaurants;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TopRestaurants = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
//   const [error, setError] = useState(""); // To store error messages
//   const budget = 2; // Budget level (1=low, 4=high)

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ latitude, longitude });

//         axios
//           .get("http://localhost:5000/restaurants", {
//             params: {
//               latitude,
//               longitude,
//               budget,
//             },
//           })
//           .then((response) => {
//             setRestaurants(response.data);
//           })
//           .catch((error) => {
//             console.error("Error fetching restaurants:", error);
//             // setError("Failed to fetch restaurant data. Please try again later.");
            
//           });
//       },
//       (geolocationError) => {
//         // console.error("Geolocation error:", geolocationError);
//         // setError("Unable to fetch your location. Using fallback location.");

//         // Fallback location (New York City)
//         const fallbackLatitude = 40.7128;
//         const fallbackLongitude = -74.0060;
//         setUserLocation({ latitude: fallbackLatitude, longitude: fallbackLongitude });

//         // Fetch restaurants for the fallback location
//         axios
//           .get("http://localhost:5000/restaurants", {
//             params: {
//               latitude: fallbackLatitude,
//               longitude: fallbackLongitude,
//               budget,
//             },
//           })
//           .then((response) => {
//             setRestaurants(response.data);
//           })
//           .catch((error) => {
//             console.error("Error fetching fallback restaurants:", error);
//             setError("Failed to fetch restaurant data for the fallback location.");
//           });
//       }
//     );
//   }, [budget]);

//   const navigateToGoogleMaps = (lat, lng) => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
//     window.open(url, "_blank");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 style={{ textAlign: "center" }}>Top Restaurants For You</h1>
//       {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
//         {restaurants.map((restaurant, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               padding: "10px",
//               width: "250px",
//               textAlign: "center",
//               cursor: "pointer",
//             }}
//             onClick={() =>
//               navigateToGoogleMaps(
//                 restaurant.geocodes.main.latitude,
//                 restaurant.geocodes.main.longitude
//               )
//             }
//           > 
            
//             <img
//               src={``}
//               alt={restaurant.name}
//               style={{ width: "100%", borderRadius: "10px" }}
//             />
//             <h3>{restaurant.name}</h3>
//             <p>{restaurant.location.formatted_address}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopRestaurants;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './App.css';

// const App = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [location, setLocation] = useState('');
//   const [budget, setBudget] = useState('');

//   useEffect(() => {
//     if (location && budget) {
//       fetchRestaurants();
//     }
//   }, [location, budget]);

//   const fetchRestaurants = async () => {
//     try {
//       const response = await axios.get('/api/restaurants', {
//         params: { location, budget },
//       });
//       setRestaurants(response.data);
//     } catch (error) {
//       console.error('Error fetching restaurants:', error.message);
//     }
//   };

//   const handleDirections = (restaurant) => {
//     navigator.geolocation.getCurrentPosition(({ coords }) => {
//       const { latitude, longitude } = coords;
//       const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${restaurant.location.lat},${restaurant.location.lng}`;
//       window.open(mapsUrl, '_blank');
//     });
//   };

//   return (
//     <div className="app">
//       <h1>Top Restaurants For You</h1>
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Enter your location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Enter your budget"const fallbackLatitude = 40.7128;
        const fallbackLongitude = -74.0060;
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)}
//         />
//         <button onClick={fetchRestaurants}>Search</button>
//       </div>
//       <div className="restaurants">
//         {restaurants.map((restaurant) => (
//           <div className="restaurant-card" key={restaurant.id}>
//             <img
//               src={restaurant.image}
//               alt={restaurant.name}
//               onClick={() => handleDirections(restaurant)}
//             />
//             <div className="restaurant-info">
//               <h3>{restaurant.name}</h3>
//               <p>{restaurant.description}</p>
//               <p><strong>Budget:</strong> {restaurant.budget}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TopRestaurants = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
//   const [error, setError] = useState(""); // To store error messages
//   const budget = 2; // Budget level (1=low, 4=high)

//   useEffect(() => {
//     // Function to fetch restaurants
//     const fetchRestaurants = (latitude, longitude) => {
//       axios
//         .get("http://localhost:5000/restaurants", {
//           params: { latitude, longitude, budget },
//         })
//         .then((response) => {
//           setRestaurants(response.data);
//         })
//         .catch((fetchError) => {
//           console.error("Error fetching restaurant data:", fetchError);
//           setError("Failed to fetch restaurant data. Please try again later.");
//         });
//     };

//     // Geolocation request
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ latitude, longitude });
//         fetchRestaurants(latitude, longitude);
//       },
//       (geolocationError) => {
//         console.error("Geolocation error:", geolocationError);

//         // Handle different error types
//         switch (geolocationError.code) {
//           case 1: // PERMISSION_DENIED
//             setError("Location access denied. Using fallback location.");
//             break;
//           case 2: // POSITION_UNAVAILABLE
//             setError("Location unavailable. Using fallback location.");
//             break;
//           case 3: // TIMEOUT
//             setError("Location request timed out. Using fallback location.");
//             break;
//           default:
//             setError("An unknown error occurred. Using fallback location.");
//             break;
//         }

//         // Fallback location (e.g., New York City)
//         const fallbackLatitude = 40.7128;
//         const fallbackLongitude = -74.0060;
//         setUserLocation({ latitude: fallbackLatitude, longitude: fallbackLongitude });
//         fetchRestaurants(fallbackLatitude, fallbackLongitude);
//       }
//     );
//   }, [budget]);

//   // Function to navigate to Google Maps
//   const navigateToGoogleMaps = (lat, lng) => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
//     window.open(url, "_blank");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 style={{ textAlign: "center" }}>Top Restaurants For You</h1>
//       {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
//         {restaurants.map((restaurant, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               padding: "10px",
//               width: "250px",
//               textAlign: "center",
//               cursor: "pointer",
//             }}
//             onClick={() =>
//               navigateToGoogleMaps(
//                 restaurant.geocodes.main.latitude,
//                 restaurant.geocodes.main.longitude
//               )
//             }
//           >
//             <img
//               src={`https://via.placeholder.com/250x150.png?text=${restaurant.name}`}
//               alt={restaurant.name}
//               style={{ width: "100%", borderRadius: "10px" }}
//             />
//             <h3>{restaurant.name}</h3>
//             <p>{restaurant.location.formatted_address}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopRestaurants;
