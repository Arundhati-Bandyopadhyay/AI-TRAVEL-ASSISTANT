import React, { useEffect, useState } from 'react';
import { getPlaceDetails } from '../../../Service/GlobalApi';
import { Link } from 'react-router-dom';

const PHOTO_REF_URL =
  'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' +
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function UserTripCartItems({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlacePhoto = async () => {
      setLoading(true);
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };
      try {
        const result = await getPlaceDetails(data);
        const photos = result.data?.places?.[0]?.photos;
        let url = '/trip.jpg';
        if (photos && photos.length > 0 && photos[0].name) {
          url = PHOTO_REF_URL.replace('{NAME}', photos[0].name);
        }
        setPhotoUrl(url);
      } catch (error) {
        console.error(error);
        setPhotoUrl('/trip.jpg');
      }
    };
    if (trip) getPlacePhoto();
  }, [trip]);

  // Handle image load event
  const handleImageLoad = () => setLoading(false);

  return (
    <Link to={`/view-trip/${trip.id}`} className='cursor-pointer'>
      <div>
        <div className="relative w-full h-[180px]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-xl z-10">
              <span className="text-gray-500">Loading...</span>
              {/* You can replace the above with a spinner if you have one */}
            </div>
          )}
          <img
            src={photoUrl}
            onLoad={handleImageLoad}
            className={`rounded-xl h-[180px] w-full gap-10 hover:scale-110 transition-all cursor-pointer object-cover ${loading ? 'opacity-0' : 'opacity-100'}`}
            alt={trip?.userSelection?.location?.label}
          />
        </div>
        <div>
          <h2 className='font-medium text-lg mt-2'>{trip?.userSelection?.location?.label}</h2>
          <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} days trip with {trip?.userSelection?.budget}</h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCartItems;