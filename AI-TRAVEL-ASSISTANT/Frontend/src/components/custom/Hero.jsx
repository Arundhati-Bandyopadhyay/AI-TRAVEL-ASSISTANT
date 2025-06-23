import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="flex flex-col items-center gap-9 px-4 sm:px-8 md:px-16 lg:px-32 max-w-4xl mx-auto py-12">
      <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-center text-[#f56551]">
        Discover Your Next Adventure at Your Fingertips
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-center text-gray-500">
        Your personal tour planner and travel curator for crafting personalized trip itineraries and providing travel suggestions tailored to your interests.
      </p>
      <Link to="/create-trip">
        <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3 text-base sm:text-lg rounded-lg">
          Get Started
        </Button>
      </Link>
    </div>
  )
}

export default Hero