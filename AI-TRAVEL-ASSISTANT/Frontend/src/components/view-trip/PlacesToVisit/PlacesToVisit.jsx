import React from 'react'
import PlaceCardItems from '../placardItems/PlaceCardItems';

function PlacesToVisit({ trip }) {
  // Debug log
  console.log("trip:", trip);

  // Parse the JSON string from trip.tripData.result
  let itinerary = [];
  const resultString = trip?.tripData?.result;
  if (typeof resultString === 'string' && resultString.trim().length > 0) {
    try {
      const parsed = JSON.parse(resultString.replace(/```json|```/g, ''));
      itinerary = parsed?.travelPlan?.itinerary || [];
    } catch (e) {
      console.error("Failed to parse itinerary JSON:", e);
    }
  }

  return (
    <div>
      <h2 className='font-bold text-lg'>Places to Visit</h2>
      <div>
        {itinerary.length > 0 ? (
          itinerary.map((item, index) => (
            <div key={index}>
              <h2 className='font-medium text-lg'>Day {item.day}</h2>
              <div className='grid md:grid-cols-2 gap-5 mt-5'>
                {item.activities.map((activity, idx) => (
                  <div key={idx} className=''>
                    <h2 className='font-medium text-sm text-orange-600'>
                      {activity.CLOCKtime}
                    </h2>
                    <PlaceCardItems activity={activity} />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary available.</p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit
