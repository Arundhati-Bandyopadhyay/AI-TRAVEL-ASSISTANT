import React from 'react'
import { Link } from 'react-router-dom';
import HotelCardItems from './HotelCardItems';

function Hotels({ trip }) {
  let hotels = [];

  // 1. Try to parse hotels from trip.tripData.result (stringified JSON)
  if (trip?.tripData?.result) {
    try {
      const cleaned = trip.tripData.result.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      console.log("Parsed tripData.result:", parsed);

      // Try all possible hotel locations
      hotels =
        parsed?.travelPlan?.hotels ||
        parsed?.hotels ||
        parsed?.hotelOptions ||
        [];
    } catch (e) {
      console.error("Failed to parse tripData.result:", e);
    }
  }

  // 2. Fallback: Try direct object path if result is not present
  if (hotels.length === 0) {
    hotels =
      trip?.tripData?.travelPlan?.hotels ||
      trip?.tripData?.hotels ||
      trip?.tripData?.hotelOptions ||
      [];
  }

  return (
    <div>
      <h2 className='font-bold text-xl mt-5 py-5'>Hotels Recommendations</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-6'>
        {hotels.length === 0 && (
          <p className='text-gray-500 col-span-2'>No hotels found.</p>
        )}
        {hotels.map((hotel) => (
          <HotelCardItems hotel={hotel}></HotelCardItems>
        ))}
      </div>
    </div>
  )
}

export default Hotels

