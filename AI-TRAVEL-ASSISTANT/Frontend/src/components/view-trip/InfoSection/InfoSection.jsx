import React, { useEffect, useState } from "react";
import { getPlaceDetails } from "../../../Service/GlobalApi";
const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function InfoSection({ trip }) {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    try {
      const result = await getPlaceDetails(data);
      const urls = result.data.places[0].photos.map((photo) => {
        return PHOTO_REF_URL.replace("{NAME}", photo.name);
      });
      setPhotoUrls(urls);
      setCurrent(0); // Reset to first photo on new trip
    } catch (error) {
      console.error(error);
    }
  };

  const prevPhoto = () => {
    setCurrent((prev) => (prev === 0 ? photoUrls.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrent((prev) => (prev === photoUrls.length - 1 ? 0 : prev + 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextPhoto();
    } else if (isRightSwipe) {
      prevPhoto();
    }
  };

  return (
    <div className="w-full">
      {/* Full-width background for the image slider */}
      <div
        className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex items-center justify-center py-2 bg-gray-100"
        style={{ minHeight: '250px' }} // Reduced from 400px
      >
        {photoUrls.length > 0 && (
          <>
            {/* Arrow buttons - Hidden on mobile, visible on tablet and desktop */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black text-white bg-opacity-90 rounded-full p-4 shadow-lg hover:bg-opacity-100 z-10 hidden md:block transition-all duration-200"
              aria-label="Previous photo"
              style={{ fontSize: 36, fontWeight: "bold" }}
            >
              &#8592;
            </button>
            
            {/* Swipeable image container */}
            <div 
              className="flex items-center justify-center w-full h-[250px] md:h-[400px] px-4 md:px-16" // Reduced h-[400px] to h-[250px] for mobile
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex items-center justify-center h-full max-h-[250px] md:max-h-[400px] w-full max-w-[900px] mx-auto rounded-xl border-4 border-gray-300 bg-gray-50 select-none" // Reduced max-h for mobile
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={photoUrls[current]}
                  alt={`Trip photo ${current + 1}`}
                  className="h-full w-full object-contain rounded-xl pointer-events-none"
                  style={{ background: "transparent" }}
                />
              </div>
            </div>
            
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black text-white bg-opacity-90 rounded-full p-4 shadow-lg hover:bg-opacity-100 z-10 hidden md:block transition-all duration-200"
              aria-label="Next photo"
              style={{ fontSize: 36, fontWeight: "bold" }}
            >
              &#8594;
            </button>
            
            {/* Dot indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {photoUrls.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                    idx === current ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            
            {/* Mobile swipe instruction - visible only on mobile */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600 bg-white bg-opacity-80 px-2 py-1 rounded-full md:hidden">
              Swipe to browse
            </div>
          </>
        )}
      </div>
      <div className="my-5 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          {trip?.userSelection?.location?.label}
        </h2>
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm sm:text-base">
            📅{trip?.userSelection?.noOfDays} Days
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm sm:text-base">
            💰{trip?.userSelection?.budget}
          </h2>
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm sm:text-base">
            🥂No of Traveler:{trip?.userSelection?.travelers}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;