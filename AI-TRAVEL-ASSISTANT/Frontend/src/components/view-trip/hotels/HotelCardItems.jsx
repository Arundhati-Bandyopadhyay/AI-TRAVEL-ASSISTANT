import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlaceDetails } from '../../../Service/GlobalApi';

const PHOTO_REF_URL =
  'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' +
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function HotelCardItems({ hotel }) {
  const [PhotoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlacePhoto = async () => {
      setLoading(true);
      const textQuery = hotel?.hotelName;
      if (!textQuery) {
        setPhotoUrl(undefined);
        setLoading(false);
        return;
      }
      try {
        const data = { textQuery };
        const result = await getPlaceDetails(data);
        const photos = result.data?.places?.[0]?.photos;
        if (photos && photos.length > 2 && photos[2].name) {
          setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', photos[2].name));
        } else if (photos && photos.length > 0 && photos[0].name) {
          setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', photos[0].name));
        } else {
          setPhotoUrl(undefined);
        }
      } catch (error) {
        console.error(error);
        setPhotoUrl(undefined);
      }
    };
    if (hotel) getPlacePhoto();
  }, [hotel]);

  const handleImageLoad = () => setLoading(false);
  const handleImageError = () => setLoading(false);

  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + ',' + hotel?.address}
      target='_blank'
    >
      <div className='hover:scale-110 transition-all cursor-pointer'>
        <div className="relative w-full h-[180px]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-xl z-10">
              <span className="text-gray-500">Loading...</span>
              {/* You can replace the above with a spinner if you have one */}
            </div>
          )}
          <img
            src={PhotoUrl }
            alt={hotel.hotelName}
            className="rounded-xl h-[180px] w-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={loading ? { opacity: 0 } : { opacity: 1 }}
          />
        </div>
        <div className='my-2 flex flex-col gap-2'>
          <h2 className='font-medium'>{hotel.hotelName}</h2>
          <h2 className='text-xs text-gray-500'>📍{hotel.address}</h2>
          <h2 className='text-sm'>💰{hotel.price}</h2>
          <h2 className='text-sm'> ⭐{hotel.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItems;