import { collection } from 'firebase/firestore';
import React from 'react'
import { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
 import { query, where, getDocs } from "firebase/firestore";
import {db} from '../../Service/firebase.config'
import UserTripCartItems from '../my-trips/UserTripCart/UserTripCartItems';


function MyTrips() {
      const navigate=useNavigate();
      const[userTrips,setUserTrips]=useState([]);
    useEffect(() => {
        GetUserTrip();
    }, []);
    const GetUserTrip=async()=>{
        const user=JSON.parse( localStorage.getItem('user'));

    
   
  
if(!user){
        navigate('/');
        return;
    }
    
    const q=query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
   


const querySnapshot = await getDocs(q);
setUserTrips([]);
querySnapshot.forEach((doc) => {
 
  console.log(doc.id, " => ", doc.data());
  setUserTrips((prevTrips) => [...prevTrips, { id: doc.id, ...doc.data() }]);
});
    }

  return (

    <div className='mx-auto mt-10 max-w-5xl px-4 sm:px-10 md:px-16 lg:px-32'>
    <h2 className='font-bold text-3xl'>My Trips</h2>
    <div className='grid grid-cols-2 mt-10 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
        {userTrips.map((trip,index) => (
          <UserTripCartItems key={trip.id} trip={trip} ></UserTripCartItems>
        ))}
    </  div>
    </div>
  )
}

export default MyTrips
