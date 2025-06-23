export const SelectTravelLesList = [
    {
        id:1,
        title:'Just me',
        desc:'A sale travels in exploring the world alone. I am looking for a solo trip.',
        icon:'🚶', // Solo traveler emoji
        people:1,
    },
    {
        id:2,
        title:'A couple',
        desc:'Two Travellers in love. We are looking for a romantic getaway.',
        icon:'👩‍❤️‍👨', // Fixed: Universal couple emoji
        people:2, // Added people property for consistency
    },
    {
        id:3,
        title:'A Family',
        desc:'A family of four. We are looking for a family trip.',
        icon:'👨‍👩‍👧‍👦', // Family emoji
        people:4,
    },
    {
        id:4, // Corrected duplicate ID
        title:'A Group of Friends',
        desc:'A group of friends. We are looking for a fun trip.',
        icon:'🎉', // Party/celebration emoji for friends
        people:8
    }
]
export const SelectBudgetOptions = [
    {
        id:1,
        title:'Low Budget',
        desc:'I am looking for a budget trip.',
        icon:'💸', // Money with wings for low budget
    },{
        id:2,
        title:'Medium Budget',
        desc:'I am looking for a medium budget trip.',
        icon:'💰', // Money bag for medium budget
    },
    {
        id:3,
        title:'High Budget',
        desc:'I am looking for a high budget trip.',
        icon:'💎', // Diamond for high budget
    },
] 

export const AI_PROMPT = `
Generate a travel plan for Location: {location}, for {noOfDays} days, for {travelers} people, with a {budget}.
Please Provide at least 8 hotel details and a day-wise itinerary.

Output should be in **valid JSON format** with the following **keys**:

- travelPlan: { location, duration, travelers, budget, currency, hotels[], itinerary[] }
- hotels: { hotelName, address, price, hotelImageUrl, geoCoordinates {latitude, longitude}, rating, description }
- itinerary: { day, title, activities[] }
- activities: { placeName, CLOCKtime,placeDetails, placeImageUrl, geoCoordinates {latitude, longitude}, ticketPricing, travelTime }

Respond only with the JSON.
`;


// export const AI_PROMPT = `
// Generate a travel plan for Location: {location}, for {noOfDays} days, for {travelers} people, with a {budget} budget.
// Provide the following:

// - At least 5 hotel options, each with:
//   - hotelName
//   - address
//   - price
//   - hotelImageUrl
//   - geoCoordinates (latitude and longitude)
//   - rating
//   - description

// - A detailed itinerary for {noOfDays} days, each day including:
//   - day number
//   - title
//   - bestTimeToVisit
//   - activities (at least 1 per day), each with:
//     - placeName
//     - placeDetails
//     - placeImageUrl
//     - geoCoordinates (latitude and longitude)
//     - ticketPricing
//     - travelTime (approximate)

// IMPORTANT: 
// Provide the **entire response in the EXACT JSON format** below:

// \`\`\`json
// {
//   "travelPlan": {
//     "location": "string (e.g., Goa, India)",
//     "duration": "string (e.g., 8 Days)",
//     "travelers": number,
//     "budget": "string (e.g., Low, Medium, High)",
//     "currency": "string (e.g., INR, USD)",
//     "hotels": [
//       {
//         "hotelName": "string",
//         "address": "string",
//         "price": number,
//         "hotelImageUrl": "string (URL)",
//         "geoCoordinates": {
//           "latitude": number,
//           "longitude": number
//         },
//         "rating": number,
//         "description": "string"
//       }
//     ],
//     "itinerary": [
//       {
//         "day": number,
//         "title": "string",
//         "bestTimeToVisit": "string",
//         "activities": [
//           {
//             "placeName": "string",
//             "placeDetails": "string",
//             "placeImageUrl": "string (URL)",
//             "geoCoordinates": {
//               "latitude": number,
//               "longitude": number
//             },
//             "ticketPricing": "string (e.g., Free or INR 300)",
//             "travelTime": "string (e.g., 30 minutes approx.)"
//           }
//         ]
//       }
//     ]
//   }
// }
// \`\`\`

// Ensure that you fill in the JSON with real data based on the location and travel days. Respond ONLY with this JSON structure and no other text.
// `;
