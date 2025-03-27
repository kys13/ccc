'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface Category {
    id: number;
    name: string;
}

interface SidebarProps {
    type: 'visit' | 'delivery';
    categories: Category[];
    cities: string[];
    districts: string[];
}

export default function CampaignSidebar({ type, categories, cities, districts }: SidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // 필터 상태
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedSns, setSelectedSns] = useState<string[]>([]);
    
    // SNS 플랫폼 목록
    const snsPlatforms = [
        { id: 'instagram', label: '인스타그램' },
        { id: 'blog', label: '블로그' },
        { id: 'youtube', label: '유튜브' },
    ] as const;

    // URL 파라미터로 필터 적용
    const applyFilters = () => {
        const params = new URLSearchParams();
        if (selectedCategory) params.set('category', selectedCategory);
        if (selectedCity) params.set('city', selectedCity);
        if (selectedDistrict) params.set('district', selectedDistrict);
        if (selectedSns.length > 0) params.set('sns', selectedSns.join(','));
        
        router.push(`/campaigns/${type}?${params.toString()}`);
    };

    // 필터 초기화
    const resetFilters = () => {
        setSelectedCategory('');
        setSelectedCity('');
        setSelectedDistrict('');
        setSelectedSns([]);
        router.push(`/campaigns/${type}`);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-6">
                {/* 카테고리 */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">카테고리</h3>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <label key={category.id} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="category"
                                    value={category.name}
                                    checked={selectedCategory === category.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedCategory(e.target.value)}
                                    className="text-primary"
                                />
                                <span>{category.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 지역 선택 */}
                {type === 'visit' && (
                    <React.Fragment>
                        {/* 시/도 */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">지역</h3>
                            <select
                                value={selectedCity}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCity(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">시/도 선택</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 구/군 */}
                        {selectedCity && (
                            <div>
                                <select
                                    value={selectedDistrict}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDistrict(e.target.value)}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">구/군 선택</option>
                                    {districts.map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </React.Fragment>
                )}

                {/* SNS 플랫폼 */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">SNS 플랫폼</h3>
                    <div className="space-y-2">
                        {snsPlatforms.map((platform) => (
                            <label key={platform.id} className="flex items-center space-x-2">
                                <Checkbox
                                    checked={selectedSns.includes(platform.id)}
                                    onCheckedChange={(checked: boolean) => {
                                        if (checked) {
                                            setSelectedSns([...selectedSns, platform.id]);
                                        } else {
                                            setSelectedSns(selectedSns.filter((id: string) => id !== platform.id));
                                        }
                                    }}
                                />
                                <span>{platform.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 필터 적용/초기화 버튼 */}
                <div className="space-y-2">
                    <Button
                        onClick={applyFilters}
                        className="w-full bg-primary text-white"
                    >
                        필터 적용
                    </Button>
                    <Button
                        onClick={resetFilters}
                        variant="outline"
                        className="w-full"
                    >
                        초기화
                    </Button>
                </div>
            </div>
        </div>
    );
} 