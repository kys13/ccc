import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { debounce } from '@/lib/utils';

export interface FilterOption {
  id: string;
  name: string;
  value: string;
}

interface CampaignFiltersProps {
  type: 'visit' | 'delivery';
  regions?: FilterOption[];
  categories?: FilterOption[];
  snsTypes?: FilterOption[];
  priceRanges?: FilterOption[];
  onFiltersChange: (filters: Record<string, string>) => void;
  initialFilters?: {
    region?: string;
    category?: string;
    snsType?: string;
    priceRange?: string;
    sort?: string;
    search?: string;
  };
  className?: string;
  hideSort?: boolean;
}

export default function CampaignFilters({
  type,
  regions,
  categories,
  snsTypes,
  priceRanges,
  onFiltersChange,
  initialFilters,
  className = '',
  hideSort = false,
}: CampaignFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = React.useState(initialFilters?.search || '');
  const [selectedRegion, setSelectedRegion] = React.useState(initialFilters?.region || 'all');
  const [selectedCategory, setSelectedCategory] = React.useState(initialFilters?.category || 'all');
  const [selectedSnsType, setSelectedSnsType] = React.useState(initialFilters?.snsType || 'all');
  const [selectedPriceRange, setSelectedPriceRange] = React.useState(initialFilters?.priceRange || 'all');
  const [sort, setSort] = React.useState(initialFilters?.sort || 'latest');

  const handleSearch = debounce((value: string) => {
    const filters = getFilters();
    if (value) {
      filters.search = value;
    } else {
      delete filters.search;
    }
    onFiltersChange(filters);
  }, 300);

  const getFilters = () => {
    const filters: Record<string, string> = { type };
    
    if (search) filters.search = search;
    if (selectedRegion !== 'all') filters.region = selectedRegion;
    if (selectedCategory !== 'all') filters.category = selectedCategory;
    if (selectedSnsType !== 'all') filters.snsType = selectedSnsType;
    if (selectedPriceRange !== 'all') filters.priceRange = selectedPriceRange;
    if (sort !== 'latest') filters.sort = sort;

    return filters;
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = {
      search: search,
      region: selectedRegion,
      category: selectedCategory,
      snsType: selectedSnsType,
      sort: sort,
      type: type,
      priceRange: selectedPriceRange,
      [key]: value
    };

    // 'all' 값인 필터만 제외 (빈 문자열은 유지)
    Object.keys(newFilters).forEach(filterKey => {
      if (newFilters[filterKey] === 'all') {
        delete newFilters[filterKey];
      }
    });

    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    setSearch('');
    setSelectedRegion('all');
    setSelectedCategory('all');
    setSelectedSnsType('all');
    setSelectedPriceRange('all');
    setSort('latest');
    onFiltersChange({ type });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          placeholder="캠페인 검색..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          className="w-full"
        />

        {regions && (
          <Select
            value={selectedRegion}
            onValueChange={(value) => {
              setSelectedRegion(value);
              handleFilterChange('region', value);
            }}
          >
            <SelectTrigger data-testid="region-select">
              {selectedRegion === 'all' ? '전체 지역' : regions.find(r => r.value === selectedRegion)?.name}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 지역</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.value}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {categories && (
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              handleFilterChange('category', value);
            }}
          >
            <SelectTrigger data-testid="category-select">
              {selectedCategory === 'all' ? '전체 카테고리' : categories.find(c => c.value === selectedCategory)?.name}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 카테고리</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.value}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {snsTypes && (
          <Select
            value={selectedSnsType}
            onValueChange={(value) => {
              setSelectedSnsType(value);
              handleFilterChange('snsType', value);
            }}
          >
            <SelectTrigger data-testid="sns-select">
              {selectedSnsType === 'all' ? '전체 SNS' : snsTypes.find(s => s.value === selectedSnsType)?.name}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 SNS</SelectItem>
              {snsTypes.map((type) => (
                <SelectItem key={type.id} value={type.value}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {!hideSort && (
          <Select
            value={sort}
            onValueChange={(value) => {
              setSort(value);
              handleFilterChange('sort', value);
            }}
          >
            <SelectTrigger data-testid="sort-select">
              {sort === 'latest' ? '최신순' :
               sort === 'deadline' ? '마감임박순' :
               sort === 'popular' ? '인기순' :
               sort === 'reward' ? '리워드순' : '최신순'}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="deadline">마감임박순</SelectItem>
              <SelectItem value="popular">인기순</SelectItem>
              <SelectItem value="reward">리워드순</SelectItem>
            </SelectContent>
          </Select>
        )}

        {type === 'delivery' && priceRanges && (
          <Select
            value={selectedPriceRange}
            onValueChange={(value) => {
              setSelectedPriceRange(value);
              handleFilterChange('priceRange', value);
            }}
          >
            <SelectTrigger data-testid="price-select">
              {selectedPriceRange === 'all' ? '전체 가격대' : priceRanges.find(p => p.value === selectedPriceRange)?.name}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 가격대</SelectItem>
              {priceRanges.map((range) => (
                <SelectItem key={range.id} value={range.value}>
                  {range.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={handleReset}
        >
          필터 초기화
        </Button>
      </div>
    </div>
  );
} 