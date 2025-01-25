import axios from 'axios';
import express from 'express';
import cors from 'cors';
const app = express();

const FOURSQUARE_API_URL = 'https://api.foursquare.com/v2/venues/';
const CLIENT_ID = '3ANPK15AFSEPSSSXMX0OEOYJBNU0DV0K1A5BSN2JMA2YQRNB';
const CLIENT_SECRET = 'NFLVR20EBMYX3I51PJO3E2PXM5NU5PFXTNOWPNDTBIVS3BDT';
const API_VERSION = '20250101';  // Use the current API version

app.get('/restaurants', async (req, res) => {
  const { latitude, longitude, budget } = req.query;
  
  try {
    const response = await axios.get('https://api.foursquare.com/v2/venues/explore', {
      params: {
        ll: `${latitude},${longitude}`,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: API_VERSION,
        radius: 5000, // Adjust as needed
        limit: 10, // Adjust as needed
        categoryId: '4d4b7105d754a06374d81259', // Food & Drink category ID
      },
    });
    
    const restaurants = await Promise.all(response.data.response.groups[0].items.map(async (item) => {
      const venueId = item.venue.id;
      
      // Fetching photos for each restaurant
      const photosResponse = await axios.get(`${FOURSQUARE_API_URL}${venueId}/photos`, {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          v: API_VERSION,
        },
      });

      // Extracting the first photo URL (you can choose another one or handle multiple)
      const photo = photosResponse.data.response.photos.items[0]
        ? `${photo.prefix}500x500${photo.suffix}`
        : 'https://via.placeholder.com/500x500.png';  // Default if no photos

      return {
        name: item.venue.name,
        location: item.venue.location,
        photos: photo,
        geocodes: item.venue.location,
      };
    }));

    res.json(restaurants);  // Send the restaurant data with images to the frontend
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Failed to fetch restaurant data.' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});


