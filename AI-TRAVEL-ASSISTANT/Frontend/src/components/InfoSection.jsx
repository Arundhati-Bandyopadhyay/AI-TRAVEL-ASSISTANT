import React, { useEffect, useState } from 'react';
import { getPlaceDetails } from './api'; // Adjust the import based on your project structure
import { PHOTO_REF_URL } from '../Service/GlobalApi'; // Adjust the import based on your project structure

const InfoSection = ({ trip }) => {
  const [PhotoUrl, setPhotoUrl] = useState();
  
  useEffect(() => {
    const textQuery = trip?.userSelection?.location?.label;
    if (typeof textQuery === 'string' && textQuery.trim().length > 0) {
      getPlacePhoto(textQuery.trim());
    }
    // eslint-disable-next-line
  }, [trip]);
  
  const getPlacePhoto = async (textQuery) => {
    const data = { textQuery };
    try {
      const res = await getPlaceDetails(data);
      const photos = res.data?.places?.[0]?.photos;
      if (photos && photos.length > 0 && photos[0].name) {
        setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', photos[0].name));
      } else {
        setPhotoUrl('/trip.jpg'); // Fallback image
      }
    } catch (error) {
      setPhotoUrl('/trip.jpg');
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto p-5 bg-white rounded-xl shadow-lg">
      <img
        src= '/trip.jpg'
        alt="Trip"
        className='h-[300px] w-full object-cover rounded-xl shadow-lg'
      
      />
      <div className="my-5 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          {trip?.userSelection?.location?.label}
        </h2>
        <div className="flex items-center gap-5 flex-wrap">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            📅{trip?.userSelection?.noOfDays} Days
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            💰{trip?.userSelection?.budget}
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            🥂No of Traveler:{trip?.userSelection?.travelers}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;