import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../InfoSection/InfoSection";
import { doc, getDoc } from "firebase/firestore"; // Uncomment and import your db instance
import { db } from "@/Service/firebase.config"; // Adjust the import path as necessary
import Hotels from "../hotels/Hotels";
import PlacesToVisit from "../PlacesToVisit/PlacesToVisit";
import Footer from "../Footer/Footer";
function ViewTrip() {
  const [trip, setTrip] = useState([]);
  const { tripId } = useParams();

  useEffect(() => {
    const GetTripData = async () => {
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:........", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  return (
    <div className="p-10 md:px-20  lg:px-44 xl:px-56">
      {/* info */}
      <InfoSection trip={trip}></InfoSection>
      {/* hotels */}
      <Hotels trip={trip}></Hotels>
      {/* gap between hotels and places to visit */}
      <div className="my-8"></div>
      {/* daily plan */}
      <PlacesToVisit trip={trip}></PlacesToVisit>
      {/* footer */}
      <Footer trip={trip}></Footer>
    </div>
  );
}

export default ViewTrip;
