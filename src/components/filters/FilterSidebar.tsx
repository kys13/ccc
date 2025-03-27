'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState({
    region: [] as string[],
    snsType: [] as string[],
    reward: [] as string[],
  });

  const regions = [
    '서울',
    '경기',
    '인천',
    '부산',
    '대구',
    '광주',
    '대전',
    '울산',
    '세종',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
  ];

  const snsTypes = [
    '블로그',
    '인스타그램',
    '유튜브',
    '페이스북',
    '틱톡',
  ];

  const rewardRanges = [
    '10만원 이하',
    '10-30만원',
    '30-50만원',
    '50-100만원',
    '100만원 이상',
  ];

  const handleFilterChange = (category: string, value: string) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [category]: prev[category as keyof typeof prev].includes(value)
          ? prev[category as keyof typeof prev].filter(item => item !== value)
          : [...prev[category as keyof typeof prev], value],
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleReset = () => {
    setFilters({
      region: [],
      snsType: [],
      reward: [],
    });
    onFilterChange({});
  };

  return (
    <aside className="w-64 bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">지역</h3>
          <div className="space-y-2">
            {regions.map((region) => (
              <div key={region} className="flex items-center">
                <Checkbox
                  id={`region-${region}`}
                  checked={filters.region.includes(region)}
                  onCheckedChange={() => handleFilterChange('region', region)}
                />
                <Label
                  htmlFor={`region-${region}`}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {region}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">SNS 유형</h3>
          <div className="space-y-2">
            {snsTypes.map((type) => (
              <div key={type} className="flex items-center">
                <Checkbox
                  id={`sns-${type}`}
                  checked={filters.snsType.includes(type)}
                  onCheckedChange={() => handleFilterChange('snsType', type)}
                />
                <Label
                  htmlFor={`sns-${type}`}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">리워드</h3>
          <div className="space-y-2">
            {rewardRanges.map((range) => (
              <div key={range} className="flex items-center">
                <Checkbox
                  id={`reward-${range}`}
                  checked={filters.reward.includes(range)}
                  onCheckedChange={() => handleFilterChange('reward', range)}
                />
                <Label
                  htmlFor={`reward-${range}`}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {range}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleReset}
        >
          필터 초기화
        </Button>
      </div>
    </aside>
  );
} 