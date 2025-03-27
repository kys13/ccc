'use client';

import React, { useState, useEffect, useCallback } from 'react';
import CampaignCard from './CampaignCard';
import type { Campaign } from '@/types/campaign';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CampaignSliderProps {
  campaigns: Campaign[];
  title: string;
}

export default function CampaignSlider({ campaigns, title }: CampaignSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const itemsPerPage = 5;

  const handlePrev = useCallback(() => {
    if (!isTransitioning && currentIndex > 0) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex, isTransitioning]);

  const handleNext = useCallback(() => {
    if (!isTransitioning && currentIndex < Math.ceil(campaigns.length / itemsPerPage) - 1) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, campaigns.length, isTransitioning]);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <div className="w-full py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>

        <div className="relative">
          {/* Left Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full bg-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          {/* Campaign Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-4"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex-none w-[calc(20%-16px)]"
                >
                  <CampaignCard campaign={campaign} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= Math.ceil(campaigns.length / itemsPerPage) - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>

        {campaigns.length > itemsPerPage && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(campaigns.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`mx-1 w-2 h-2 rounded-full ${
                  currentIndex === index ? 'bg-[#FF5C35]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 