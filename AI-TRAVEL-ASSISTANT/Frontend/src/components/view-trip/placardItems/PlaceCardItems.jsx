import React, { useState, useEffect } from 'react';
import { getPlaceDetails } from '../../../Service/GlobalApi';

const PHOTO_REF_URL =
  'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' +
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function PlaceCardItems({ activity }) {
  const [photoUrl, setPhotoUrl] = useState('/trip.jpg'); // fallback image

  
  const handleImageLoad = () => setLoading(false);
  const handleImageError = () => setLoading(false);
  useEffect(() => {
    const getPlacePhoto = async () => {
      const textQuery = activity.placeName;
      if (!textQuery) return;
      try {
        const data = { textQuery };
        const result = await getPlaceDetails(data);
        const photos = result.data?.places?.[0]?.photos;
        if (photos && photos.length > 0 && photos[0].name) {
          setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', photos[0].name));
        } else {
          setPhotoUrl('/trip.jpg');
        }
      } catch (error) {
        console.error(error);
        setPhotoUrl('/trip.jpg');
      }
    };
    if (activity) getPlacePhoto();
  }, [activity]);

  return (
    <div className="rounded-xl shadow border border-gray-300 flex gap-5 p-3 mt-2 hover:scale-105 transition-all cursor-pointer bg-white">
      <img
        src={photoUrl}
        alt={activity.placeName}
        className="w-[130px] h-[130px] rounded-lg object-cover border"
      />
      <div>
        <h2 className="font-bold text-lg">{activity.placeName}</h2>
        <p className="text-sm text-gray-400">{activity.placeDetails}</p>
        <h2 className="mt-2">⏰{activity.travelTime}</h2>
      </div>
    </div>
  );
}

export default PlaceCardItems;
