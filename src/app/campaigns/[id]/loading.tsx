export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        {/* 이미지 스켈레톤 */}
        <div className="w-full h-[400px] bg-gray-200 rounded-lg mb-8" />
        
        {/* 제목 스켈레톤 */}
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
        
        {/* 메타 정보 스켈레톤 */}
        <div className="flex space-x-4 mb-8">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
        
        {/* 컨텐츠 스켈레톤 */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
} 