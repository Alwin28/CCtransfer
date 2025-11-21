// Campus finder - location search, filtering, directory display
import { communityColleges, californiaCities } from './campusData.js';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lng1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lng2 - Longitude of point 2
 * @returns {number} Distance in miles
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 3959; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Find the three nearest community colleges to a given city
 * @param {string} cityName - Name of the California city
 * @returns {Array|null} Array of three nearest colleges with distance, or null if city not found
 */
export function findNearestColleges(cityName) {
  // Normalize city name for lookup (case-insensitive)
  const normalizedCity = Object.keys(californiaCities).find(
    city => city.toLowerCase() === cityName.toLowerCase()
  );
  
  if (!normalizedCity) {
    return null;
  }
  
  const cityCoords = californiaCities[normalizedCity];
  
  // Calculate distance to each college
  const collegesWithDistance = communityColleges.map(college => ({
    ...college,
    distance: calculateDistance(
      cityCoords.lat,
      cityCoords.lng,
      college.lat,
      college.lng
    )
  }));
  
  // Sort by distance and get top 3
  const nearest = collegesWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);
  
  return nearest;
}

/**
 * Initialize the campus finder form
 */
export function initCampusFinder() {
  const form = document.getElementById('campusFinderForm');
  const resultsDiv = document.getElementById('campusResults');
  const errorDiv = document.getElementById('campusError');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();
    
    // Clear previous results/errors
    resultsDiv.innerHTML = '';
    errorDiv.innerHTML = '';
    errorDiv.style.display = 'none';
    
    if (!cityName) {
      showError(errorDiv, 'Please enter a city name.');
      return;
    }
    
    const nearest = findNearestColleges(cityName);
    
    if (!nearest) {
      showError(errorDiv, `"${cityName}" not found. Please enter a valid California city.`);
      return;
    }
    
    displayResults(resultsDiv, nearest, cityName);
  });
}

function showError(errorDiv, message) {
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

function displayResults(resultsDiv, colleges, cityName) {
  resultsDiv.innerHTML = `
    <h3>Nearest Community Colleges to ${cityName}</h3>
    <div class="college-results">
      ${colleges.map((college, index) => `
        <div class="college-card">
          <div class="college-rank">${index + 1}</div>
          <div class="college-info">
            <h4>${college.name}</h4>
            <p class="college-location">${college.city}</p>
            <p class="college-distance">${college.distance.toFixed(1)} miles away</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCampusFinder);
} else {
  initCampusFinder();
}
