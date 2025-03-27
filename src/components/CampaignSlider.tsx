import { useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import CampaignCard from './CampaignCard';

interface Campaign {
  id: number;
  title: string;
  imageUrl?: string;
  reward: number;
  maxParticipants: number;
  currentParticipants: number;
  endDate: Date;
  type: 'visit' | 'delivery';
}

interface CampaignSliderProps {
  campaigns: Campaign[];
  title: string;
}

export default function CampaignSlider({ campaigns, title }: CampaignSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const itemsPerView = 4;
  const maxIndex = Math.max(0, campaigns.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - itemsPerView));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + itemsPerView));
  };

  return (
    <div className="relative py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
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
            ref={sliderRef}
            className="flex transition-transform duration-300 ease-in-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex-none w-[calc(25%-18px)]"
              >
                <CampaignCard {...campaign} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
} 