import React, { useEffect, useState } from 'react'
import { getPlaceDetails } from '../../../Service/GlobalApi'
const PHOTO_REF_URL =
  'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' +
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
function InfoSection({ trip }) {

  const [photoUrls, setPhotoUrls] = useState([]);

  useEffect(() => {
    trip && getPlacePhoto()
  }, [trip])


  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    try {
      const result = await getPlaceDetails(data); // Pass data here
      console.log("namee", result.data);


      const urls = result.data.places[0].photos.map((photo, index) => {
        return PHOTO_REF_URL.replace('{NAME}', photo.name);
      });
      setPhotoUrls(urls);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full">
      <div className="flex overflow-x-auto gap-4 py-2">
        {photoUrls.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`Trip photo ${idx + 1}`}
            className="w-[500px] h-[320px] object-cover rounded-xl flex-shrink-0 border-4 border-gray-300"
          />
        ))}
      </div>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className="text-2xl font-bold">
          {trip?.userSelection?.location?.label}
        </h2>
        <div className='flex items-center gap-5'>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 '>📅{trip?.userSelection?.noOfDays} Days</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 '>💰{trip?.userSelection?.budget}</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 '>🥂No of Traveler:{trip?.userSelection?.travelers}</h2>

        </div>
      </div>
    </div>
  )
}

export default InfoSection
